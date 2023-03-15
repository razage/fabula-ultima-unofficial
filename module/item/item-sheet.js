export class FabulaUltimaItemSheet extends ItemSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["fabulaultima", "sheet", "item"],
            width: 560,
            height: 500,
            tabs: [
                {
                    navSelector: ".sheet-tabs",
                    contentSelector: ".sheet-body",
                    initial: "attributes",
                },
            ],
        });
    }

    get template() {
        const path = "systems/fabulaultima/templates/item";

        // unique sheet for each type of item
        return `${path}/item-${this.item.type}-sheet.hbs`;
    }

    async getData() {
        const data = super.getData();

        data.enrichedQuality = await TextEditor.enrichHTML(this.object.system.quality, {
            async: true,
        });

        data.enrichedNotes = await TextEditor.enrichHTML(this.object.system.notes, { async: true });

        if (this.object.system.hasOwnProperty("opportunity")) {
            data.enrichedOpportunity = await TextEditor.enrichHTML(
                this.object.system.opportunity.quality,
                { async: true }
            );
        }

        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);

        if (!this.options.editable) return;
    }
}
