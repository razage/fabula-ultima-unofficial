export async function fabulaRoll(
    actor,
    mainStat,
    secondaryStat,
    bonus = 0,
    isHighRoll = false,
    target
) {
    let roll = new Roll(`d${mainStat.current}+d${secondaryStat.current}+${bonus}`, actor.system);

    await roll.evaluate({ async: true });

    let results = [];
    let total = roll.total;
    let isCrit = false;
    let isFumble = false;

    roll.terms.forEach((r) => {
        // Ignore the OperatorTerm object(s)
        if (r.hasOwnProperty("results")) {
            results.push(r.results[0].result);
        }
    });
    isFumble = isRollFumble(results);
    isCrit = isRollCrit(results);
    await sendRollToChat(actor, mainStat, secondaryStat, roll, isCrit, isFumble);
}

export async function sendRollToChat(
    actor,
    mainStat,
    secondaryStat,
    rollObj,
    isCritical,
    isFumble
) {
    console.log(rollObj);
    let result = await renderTemplate("systems/fabulaultima/templates/rolls/roll.hbs", {
        roll: rollObj,
        crit: isCritical,
        fumble: isFumble,
        mainStat: mainStat,
        secondaryStat: secondaryStat,
    });

    let messageData = {
        speaker: ChatMessage.getSpeaker({ actor: actor }),
        content: result,
        flavor: `${game.i18n.localize("FU.Chat.rolling")} <b>${game.i18n.localize(
            "FU.Short." + mainStat.name
        )} + ${game.i18n.localize("FU.Short." + secondaryStat.name)}</b>`,
        type: CONST.CHAT_MESSAGE_TYPES.ROLL,
        roll: rollObj,
    };

    ChatMessage.create(messageData, {});
}

export function isRollFumble(rollResults) {
    if (rollResults[0] === 1 && rollResults[1] === 1) return true;
    else return false;
}

export function isRollCrit(rollResults) {
    // If the numbers match and they're both 6 or above
    if (rollResults[0] === rollResults[1] && rollResults[0] >= 6 && rollResults[1] >= 6)
        return true;
    else return false;
}
