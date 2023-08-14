import { FabulaUltimaActor } from "./actor/actor.js";
import { FabulaUltimaActorSheet } from "./actor/actor-sheet.js";
import { FabulaUltimaItem } from "./item/item.js";
import { FabulaUltimaItemSheet } from "./item/item-sheet.js";
import { FUActiveEffect } from "./FUActiveEffect.js";
import { FUCombat } from "./combat/combat.js";
import { FUCombatant } from "./combat/combatant.js";
import { registerSystemSettings } from "./settings.js";
import { preloadHandlebarsTemplates } from "./templates.js";

Hooks.once("init", async function () {
    game.fabulaultima = {
        FabulaUltimaActor,
        FabulaUltimaItem,
    };

    // Define custom Entity classes
    CONFIG.Actor.documentClass = FabulaUltimaActor;
    CONFIG.Item.documentClass = FabulaUltimaItem;
    CONFIG.ActiveEffect.documentClass = FUActiveEffect;
    CONFIG.Combat.documentClass = FUCombat;
    CONFIG.Combatant.documentClass = FUCombatant;

    Actors.unregisterSheet("core", ActorSheet);
    Items.unregisterSheet("core", ItemSheet);
    Actors.registerSheet("fabulaultima", FabulaUltimaActorSheet, { makeDefault: true });
    Items.registerSheet("fabulaultima", FabulaUltimaItemSheet, { makeDefault: true });

    // Register system settings
    registerSystemSettings();

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

    Handlebars.registerHelper("if_not_eq", function (a, b, opts) {
        if (a != b) {
            return opts.fn(this);
        }
        return opts.inverse(this);
    });

    Handlebars.registerHelper("toUpperCase", function (str) {
        try {
            return str.toUpperCase();
        } catch (error) {
            return "";
        }
    });

    Handlebars.registerHelper("toLowerCase", function (str) {
        try {
            return str.toLowerCase();
        } catch (error) {
            return "";
        }
    });

    Handlebars.registerHelper("getLocalizedElement", function (element) {
        element = element.toLowerCase();

        return game.i18n.localize("FU.Elements." + element);
    });

    Handlebars.registerHelper("getElementalIcon", function (element) {
        let output = "systems/fabulaultima/assets/ui/";

        switch (element) {
            case "air":
                output += "tornado.svg";
                break;
            case "bolt":
                output += "lightning-branches.svg";
                break;
            case "dark":
                output += "evil-moon.svg";
                break;
            case "earth":
                output += "rock.svg";
                break;
            case "fire":
                output += "flame.svg";
                break;
            case "ice":
                output += "ice-bolt.svg";
                break;
            case "light":
                output += "sun.svg";
                break;
            case "physical":
                output += "punch-blast.svg";
                break;
            case "poison":
                output += "poison-bottle.svg";
                break;
            case "void":
                output += "eclipse-flare.svg";
                break;
            default:
                output += "";
                break;
        }

        return output;
    });
});

// Called once when it finishes loading
Hooks.on("ready", () => {
    let bgColors = [
        game.settings.get("fabulaultima", "backgroundColor1"),
        game.settings.get("fabulaultima", "backgroundColor2"),
    ];
    let fontColor = game.settings.get("fabulaultima", "fontColor");
    let customCSS = "";
    let customStyle = document.createElement("style");
    customStyle.id = "fu-custom-css";

    customCSS += `
    .fabulaultima.sheet section.window-content {
        color: ${fontColor};
        background: ${bgColors[1]};
        background: linear-gradient(180deg, ${bgColors[0]} 0%, ${bgColors[1]} 100%);
    }`;

    customStyle.innerHTML = customCSS;

    if (customCSS != "") {
        document.querySelector("head").appendChild(customStyle);
    }
});

// This event is fired on all connected clients
Hooks.on("createActor", async function (actor, options, userId) {
    if (userId != game.user.id) {
        return;
    }

    if (actor.type != null) {
        if (actor.type === "player") {
            actor.addDefaultItems();
        }
    }
});
