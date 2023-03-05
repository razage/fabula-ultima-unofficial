import { fabulaAttackRoll } from "../roll/roll.js";

export class FabulaUltimaActorSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["fabulaultima", "sheet", "actor"],
            template: "systems/fabulaultima/templates/actor/actor-sheet.hbs",
            width: 700,
            height: 800,
            tabs: [
                {
                    navSelector: ".sheet-tabs",
                    contentSelector: ".sheet-body",
                    initial: "attributes",
                },
            ],
        });
    }

    async getData() {
        const data = super.getData();

        if (this.actor.type === "player") {
            this._prepareCharacterItems(data);
        }

        return data;
    }

    _prepareCharacterItems(sheetData) {
        const actorData = sheetData.actor;
        const accessories = [];
        const armor = [];
        const classes = [];
        const spells = [];
        const weapons = [];

        sheetData.items.forEach((item) => {
            switch (item.type) {
                case "class": {
                    classes.push(item);
                    break;
                }

                case "weapon": {
                    weapons.push(item);
                    break;
                }

                default: {
                    console.log("itemType ", item.type, " is not currently implemented.");
                }
            }
        });

        // This gets put into the actor object. For consistency, my data is stored in actor.system
        actorData.system.accessories = accessories;
        actorData.system.armor = armor;
        actorData.system.classes = classes;
        actorData.system.spells = spells;
        actorData.system.weapons = weapons;
    }

    activateListeners(html) {
        super.activateListeners(html);

        if (!this.options.editable) return;

        html.find(".item-edit").click((ev) => {
            const parent = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(parent.data("itemId"));

            item.sheet.render(true);
        });

        html.find(".item-roll").click((ev) => {
            const parent = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(parent.data("itemId"));
            const main = this.actor.system.attributes[item.system.accuracy.mainStat];
            const sec = this.actor.system.attributes[item.system.accuracy.secondaryStat];

            fabulaAttackRoll(this.actor, main, sec, item);
        });

        html.find(".item-delete").click((ev) => {
            const parent = $(ev.currentTarget).parents(".item");
            let options = {};

            this.actor.deleteEmbeddedDocuments("Item", [parent.data("itemId")], options);
        });
    }
}
