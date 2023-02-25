export const preloadHandlebarsTemplates = async function () {
    return loadTemplates([
        "systems/fabulaultima/templates/actor/class-card.hbs",
        "systems/fabulaultima/templates/actor/attribute-dropdown.hbs",
        "systems/fabulaultima/templates/actor/resource-card.hbs",
        "systems/fabulaultima/templates/item/partials/ritual-row.hbs",
    ]);
};
