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

        //Calculate statistics
        for (let [key, statistic] of Object.entries(system.attributes)) {
            statistic.current = statistic.base + statistic.bonus;
        }

        // Calculate the character's level
        let _tempLevel = 0;

        for (let [key, klass] of Object.entries(system.classes)) {
            _tempLevel += klass.level;
        }
        system.characterLevel = _tempLevel;

        // Update resources to reflect bonuses
        system.hp.max =
            system.attributes.might.current * 5 +
            system.characterLevel +
            system.hp.bonus;
        system.mp.max =
            system.attributes.willpower.current * 5 +
            system.characterLevel +
            system.mp.bonus;
        system.ip.max = 6 + system.ip.bonus;

        if (system.hp.value > system.hp.max) {
            system.hp.value = system.hp.max;
        }

        if (system.mp.value > system.mp.max) {
            system.mp.value = system.mp.max;
        }

        if (system.ip.value > system.ip.max) {
            system.ip.value = system.ip.max;
        }

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
