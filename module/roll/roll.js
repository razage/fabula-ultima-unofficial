export async function fabulaAttackRoll(actor, mainStat, secondaryStat, item) {
    let roll = new Roll(
        `d${mainStat.current}+d${secondaryStat.current}+${item.system.accuracy.bonus}`,
        actor.system
    );

    await roll.evaluate({ async: true });

    let results = [];
    let highRoll = 0;

    roll.terms.forEach((r) => {
        // Ignore the OperatorTerm object(s)
        if (r.hasOwnProperty("results")) {
            if (r.results[0].result > highRoll) highRoll = r.results[0].result;
            results.push(r.results[0].result);
        }
    });

    let data = {};
    data.isFumble = isRollFumble(results);
    data.isCrit = isRollCrit(results);
    data.highRoll = highRoll;
    data.item = item;

    await sendRollToChat(actor, mainStat, secondaryStat, roll, "attack", data);
}

export async function sendRollToChat(actor, mainStat, secondaryStat, rollObj, rollType, data) {
    console.log(rollObj);
    let result = null;
    let flavor = "";

    switch (rollType) {
        case "attack":
            result = await renderTemplate("systems/fabulaultima/templates/rolls/attack-roll.hbs", {
                roll: rollObj,
                crit: data.isCrit,
                fumble: data.isFumble,
                mainStat: mainStat,
                secondaryStat: secondaryStat,
                damage: {
                    type: data.item.system.damage.type,
                    bonus: data.item.system.damage.bonus,
                    total: data.highRoll + data.item.system.damage.bonus,
                    multi: data.item.system.multi.enabled,
                    multiValue: data.item.system.multi.value,
                },
                highRoll: data.highRoll,
                itemName: data.item.name,
            });

            flavor = `${game.i18n.localize("FU.Chat.attackingWith")} <b>${
                data.item.name
            }</b> (${game.i18n.localize("FU.Chat.using")} <b>${game.i18n.localize(
                "FU.Short." + mainStat.name
            )} + ${game.i18n.localize("FU.Short." + secondaryStat.name)}</b>)`;
            break;
    }

    let messageData = {
        speaker: ChatMessage.getSpeaker({ actor: actor }),
        content: result,
        flavor: flavor,
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
