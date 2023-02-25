export const preloadHandlebarsTemplates = async function () {
    return loadTemplates([
        "systems/fabulaultima/templates/actor/class-card.hbs",
        "systems/fabulaultima/templates/actor/attribute-dropdown.hbs",
    ]);
};
