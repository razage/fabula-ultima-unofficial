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

        this._determineImmunities(actorData);
    }

    _preparePlayerData(actorData) {
        const { system } = actorData;

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

                // Adjust rituals and proficiencies
                for (const [key, value] of Object.entries(element.system.benefits.rituals)) {
                    if (value) {
                        system.rituals[key] = value;
                    }
                }

                for (const [key, value] of Object.entries(element.system.benefits.martial)) {
                    if (value) {
                        system.martial[key] = value;
                    }
                }
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

    _determineImmunities(actorData) {
        for (const [key, value] of Object.entries(actorData.system.statuses)) {
            // If the condition is active and the user is immune
            if (value.immune && value.active) {
                const effects = actorData.getEmbeddedCollection("ActiveEffect").contents;
                const relevantEffects = effects.filter((k) => k.label === key);

                if (relevantEffects.length === 0) continue;

                let actorProp = { system: { statuses: {} } };
                actorProp.system.statuses[key] = { active: false };
                actorData.update(actorProp);
                actorData.deleteEmbeddedDocuments("ActiveEffect", [relevantEffects[0]._id], {});
            }
        }
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
