import { clamp } from "../other/helpers.js";

export class FabulaUltimaActor extends Actor {
    prepareData() {
        super.prepareData();

        const actorData = this;
        const system = actorData.system;
        const flags = actorData.flags;

        // Make separate methods for each Actor type (character, npc, etc.) to keep
        // things organized.
        if (actorData.type === "player") this._preparePlayerData(actorData);
    }

    _preparePlayerData(actorData) {
        const { system } = actorData;

        //Reset bonuses in case an item was removed
        system.hp.bonus = 0;
        system.mp.bonus = 0;
        system.ip.bonus = 0;
        system.bonuses.accuracy.physical = 0;
        system.bonuses.accuracy.magic = 0;
        system.defenses.physical.bonus = 0;
        system.defenses.magic.bonus = 0;

        //Calculate statistics
        for (let [key, statistic] of Object.entries(system.attributes)) {
            statistic.current = clamp(statistic.base + statistic.bonus, 6, 12);
        }

        // Calculate class-based stats
        let _tempLevel = 0;

        actorData.items.forEach((element) => {
            if (element.type === "accessory") {
                if (element.system.isEquipped) {
                    system.hp.bonus += element.system.hpBonus;
                    system.mp.bonus += element.system.mpBonus;
                    system.defenses.physical.bonus += element.system.defense.value;
                    system.defenses.magic.bonus += element.system.mDefense.value;
                    system.initiativeMod += element.system.initiative;
                    system.bonuses.accuracy.physical += element.system.accuracyBonus.physical;
                    system.bonuses.accuracy.magic += element.system.accuracyBonus.magic;
                }
            }
            if (element.type === "armor") {
                if (element.system.isEquipped) {
                    system.defenses.physical.bonus += element.system.defense.value;
                    system.defenses.magic.bonus += element.system.mDefense.value;
                    system.initiativeMod += element.system.initiative;

                    // If the armor uses a static value for the defense, subtract the attribute from the total
                    if (!element.system.defense.useDex) {
                        system.defenses.physical.bonus -= system.attributes.dexterity.current;
                    }

                    if (!element.system.mDefense.useIns) {
                        system.defenses.magic.bonus -= system.attributes.insight.current;
                    }
                }
            }

            if (element.type === "bond") {
                let emotions = [
                    element.system.emotionOne,
                    element.system.emotionTwo,
                    element.system.emotionThree,
                ];
                let strength = 0;

                emotions.forEach((e) => {
                    if (e !== "") strength++;
                });

                element.system.strength = strength;
            }

            if (element.type === "class") {
                system.hp.bonus += element.system.benefits.resource.hp;
                system.mp.bonus += element.system.benefits.resource.mp;
                system.ip.bonus += element.system.benefits.resource.ip;

                _tempLevel += element.system.level;
            }

            if (element.type === "weapon") {
                if (element.system.isEquipped) {
                    system.defenses.physical.bonus += element.system.defense.value;
                    system.defenses.magic.bonus += element.system.mDefense.value;
                }
            }
        });

        system.characterLevel = clamp(_tempLevel, 0, 50);

        // Update resources to reflect bonuses
        system.hp.max =
            system.attributes.might.current * 5 + system.characterLevel + system.hp.bonus;
        system.mp.max =
            system.attributes.willpower.current * 5 + system.characterLevel + system.mp.bonus;
        system.ip.max = 6 + system.ip.bonus;

        system.hp.value = clamp(system.hp.value, 0, system.hp.max);
        system.mp.value = clamp(system.mp.value, 0, system.mp.max);
        system.ip.value = clamp(system.ip.value, 0, system.ip.max);

        system.hp.crisis = Math.floor(system.hp.max / 2);

        // Calculate derived stats
        system.defenses.physical.base = system.attributes.dexterity.base;
        system.defenses.physical.value =
            system.defenses.physical.base + system.defenses.physical.bonus;
        system.defenses.magic.base = system.attributes.insight.base;
        system.defenses.magic.value = system.defenses.magic.base + system.defenses.magic.bonus;
    }

    static async create(data, options = {}) {
        data.prototypeToken = data.prototypeToken || {};

        if (data.type === "player") {
            mergeObject(
                data.prototypeToken,
                {
                    actorLink: true,
                },
                {
                    overwrite: false,
                }
            );
        }

        return super.create(data, options);
    }

    async addDefaultItems() {
        try {
            let consumable = {};
            let brawlingWeapons = {};
            consumable.pack = await game.packs.get("fabulaultima.consumables");
            consumable.index = await consumable.pack.getIndex();
            brawlingWeapons.pack = await game.packs.get("fabulaultima.weapons-brawling");
            brawlingWeapons.index = await brawlingWeapons.pack.getIndex();
            let toAdd = [];

            // Add every item from the consumables compendium
            for (let idx of consumable.index) {
                let _temp = await consumable.pack.getDocument(idx._id);
                toAdd.push(_temp);
            }

            // Add the unarmed strike "weapon"
            for (let idx of brawlingWeapons.index) {
                let _temp = await brawlingWeapons.pack.getDocument(idx._id);

                if (_temp.name === "Unarmed Strike") {
                    toAdd.push(_temp);
                }
            }

            await this.createEmbeddedDocuments("Item", toAdd);
        } catch (ex) {
            console.log("Error adding default items to Actor.");
            console.log(ex);
        }
    }
}
