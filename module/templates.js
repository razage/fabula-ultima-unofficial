export const preloadHandlebarsTemplates = async function () {
    return loadTemplates([
        "systems/fabulaultima/templates/actor/partials/class-card.hbs",
        "systems/fabulaultima/templates/actor/partials/attribute-dropdown.hbs",
        "systems/fabulaultima/templates/actor/partials/resource-card.hbs",
        "systems/fabulaultima/templates/item/partials/ritual-row.hbs",
    ]);
};
