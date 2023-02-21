import { FabulaUltimaActor } from "./actor/actor.js";
import { FabulaUltimaActorSheet } from "./actor/actor-sheet.js";

Hooks.once("init", async function () {
    game.fabulaultima = {
        FabulaUltimaActor,
    };
});

// Define custom Entity classes
CONFIG.Actor.documentClass = FabulaUltimaActor;

Actors.unregisterSheet("core", ActorSheet);
Actors.registerSheet("fabulaultima", FabulaUltimaActorSheet, {
    makeDefault: true,
});

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

// Hooks.on("createActor", async function (actor, options, userId) {
//     try {
//         if (actor != null) {
//             if (actor.type === "player") {
//                 let updatedData = duplicate(actor.system);
//                 actor.update({ data: updatedData });
//             }
//         }
//     } catch (ex) {
//         console.log(ex);
//     }
// });
