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

        //Reset bonuses in case a class was removed
        system.hp.bonus = 0;
        system.mp.bonus = 0;
        system.ip.bonus = 0;

        //Calculate statistics
        for (let [key, statistic] of Object.entries(system.attributes)) {
            statistic.current = clamp(statistic.base + statistic.bonus, 6, 12);
        }

        // Calculate class-based stats
        let _tempLevel = 0;

        for (let [key, klass] of Object.entries(system.classes)) {
            system.hp.bonus += klass.benefits.resource.hp;
            system.mp.bonus += klass.benefits.resource.mp;
            system.ip.bonus += klass.benefits.resource.ip;

            _tempLevel += klass.level;
        }
        system.characterLevel = clamp(_tempLevel, 5, 50);

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
        system.defense = system.attributes.dexterity.base;
        system.magicDefense = system.attributes.insight.base;
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
}
