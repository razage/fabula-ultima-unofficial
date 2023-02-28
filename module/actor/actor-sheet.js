import { fabulaRoll } from "../roll/roll.js";

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

        const classes = [];

        sheetData.items.forEach((item) => {
            if (item.type === "class") classes.push(item);
        });

        // This gets put into the actor object. For consistency, my data is stored in actor.system
        actorData.system.classes = classes;
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

            fabulaRoll(this.actor, main, sec, item.system.accuracy.bonus);
        });

        html.find(".item-delete").click((ev) => {
            const parent = $(ev.currentTarget).parents(".item");
            let options = {};

            this.actor.deleteEmbeddedDocuments("Item", [parent.data("itemId")], options);
        });
    }
}
