export const registerSystemSettings = function () {
    game.settings.register("fabulaultima", "backgroundColor1", {
        name: "Background Color 1",
        hint: "Use a color picker and get the hex code for the color you want. Don't forget the #. It forms a gradient from this color to the next one.",
        scope: "world", // This specifies a world-stored setting
        config: true, // This specifies that the setting appears in the configuration view
        type: String,
        default: "#2021a0", // The default value for the setting
    });

    game.settings.register("fabulaultima", "backgroundColor2", {
        name: "Background Color 2",
        hint: "Use a color picker and get the hex code for the color you want. Don't forget the #. It forms a gradient from the previous color to this one.",
        scope: "world",
        config: true,
        type: String,
        default: "#010661",
    });

    game.settings.register("fabulaultima", "fontColor", {
        name: "Font Color",
        hint: "Use a color picker and get the hex code for the color you want. Don't forget the #.",
        scope: "world",
        config: true,
        type: String,
        default: "#f8f8f8",
    });
};
