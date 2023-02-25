import { FabulaUltimaActor } from "./actor/actor.js";
import { FabulaUltimaActorSheet } from "./actor/actor-sheet.js";
import { FabulaUltimaItem } from "./item/item.js";
import { FabulaUltimaItemSheet } from "./item/item-sheet.js";
import { preloadHandlebarsTemplates } from "./templates.js";

Hooks.once("init", async function () {
    game.fabulaultima = {
        FabulaUltimaActor,
        FabulaUltimaItem,
    };

    // Define custom Entity classes
    CONFIG.Actor.documentClass = FabulaUltimaActor;
    CONFIG.Item.documentClass = FabulaUltimaItem;

    Actors.unregisterSheet("core", ActorSheet);
    Items.unregisterSheet("core", ItemSheet);
    Actors.registerSheet("fabulaultima", FabulaUltimaActorSheet, { makeDefault: true });
    Items.registerSheet("fabulaultima", FabulaUltimaItemSheet, { makeDefault: true });

    // Preload Handlebars partials
    preloadHandlebarsTemplates();

    Handlebars.registerHelper("concat", function () {
        var outStr = "";
        for (var arg in arguments) {
            if (typeof arguments[arg] != "object") {
                outStr += arguments[arg];
            }
        }
        return outStr;
    });

    Handlebars.registerHelper("if_eq", function (a, b, opts) {
        if (a == b) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        }
    });

    Handlebars.registerHelper("toUpperCase", function (str) {
        try {
            return str.toUpperCase();
        } catch (error) {
            return "";
        }
    });
});
