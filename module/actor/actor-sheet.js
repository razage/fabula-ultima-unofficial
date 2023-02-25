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
    }
}
