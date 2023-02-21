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

    getData() {
        const context = super.getData();
        const actorData = this.actor.toObject(false);

        // Add context.data for easier access
        context.system = actorData.system;
        context.flags = actorData.flags;

        return context;
    }

    // activateListeners(html) {
    //     super.activateListeners(html);
    // }
}
