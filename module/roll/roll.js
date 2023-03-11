export async function fabulaAttackRoll(actor, mainStat, secondaryStat, item) {
    let data = await _fabulaRollCommon(actor, mainStat, secondaryStat, item.system.accuracy.bonus);
    data.item = item;

    // Dual wielding sets the HR to 0
    if (item.system.isDualWielding) {
        data.highRoll = 0;
    }

    await sendRollToChat(actor, mainStat, secondaryStat, "attack", data);
}

export async function fabulaSkillRoll(actor, mainStat, secondaryStat, bonus = 0) {
    let data = await _fabulaRollCommon(actor, mainStat, secondaryStat, bonus);

    await sendRollToChat(actor, mainStat, secondaryStat, "skill", data);
}

export async function sendRollToChat(actor, mainStat, secondaryStat, rollType, data) {
    let result = null;
    let flavor = "";
    let obj = {};

    switch (rollType) {
        case "attack":
            obj.roll = data.rollObj;
            obj.crit = data.isCrit;
            obj.fumble = data.isFumble;
            obj.dw = data.item.system.isDualWielding;
            obj.mainStat = mainStat;
            obj.secondaryStat = secondaryStat;
            obj.damage = {
                bonus: data.item.system.damage.bonus,
                type: data.item.system.damage.type,
                multi: data.item.system.multi.enabled,
                multiValue: data.item.system.multi.value,
            };
            obj.highRoll = data.highRoll;
            obj.itemName = data.item.name;

            // Calculate the total after all adjustments
            obj.damage.total = obj.highRoll + obj.damage.bonus;

            result = await renderTemplate(
                "systems/fabulaultima/templates/rolls/attack-roll.hbs",
                obj
            );

            flavor = `${game.i18n.localize("FU.Chat.attackingWith")} <b>${
                data.item.name
            }</b> (${game.i18n.localize("FU.Chat.using")} <b>${game.i18n.localize(
                "FU.Short." + mainStat.name
            )} + ${game.i18n.localize("FU.Short." + secondaryStat.name)}</b>)`;
            break;
        case "skill":
            obj.roll = data.rollObj;
            obj.crit = data.isCrit;
            obj.fumble = data.isFumble;
            obj.mainStat = mainStat;
            obj.secondaryStat = secondaryStat;
            obj.total = data.rollObj.total;

            result = await renderTemplate(
                "systems/fabulaultima/templates/rolls/skill-roll.hbs",
                obj
            );
            flavor = `${game.i18n.localize("FU.Chat.rollingSkillCheck")} (${game.i18n.localize(
                "FU.Chat.using"
            )} <b>${game.i18n.localize("FU.Short." + mainStat.name)} + ${game.i18n.localize(
                "FU.Short." + secondaryStat.name
            )}</b>)`;
            break;
    }

    let messageData = {
        speaker: ChatMessage.getSpeaker({ actor: actor }),
        content: result,
        flavor: flavor,
        type: CONST.CHAT_MESSAGE_TYPES.ROLL,
        roll: data.rollObj,
    };

    // Fallback audio in case the user isn't using DiceSoNice
    AudioHelper.play({ src: "sounds/dice.wav", volume: 0.8, autoplay: true, loop: false }, true);

    ChatMessage.create(messageData, {});
}

async function _fabulaRollCommon(actor, mainStat, secondaryStat, bonus = 0) {
    let roll = new Roll(`d${mainStat.current}+d${secondaryStat.current}+${bonus}`, actor.system);

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
    data.rollObj = roll;
    data.highRoll = highRoll;
    data.isFumble = isRollFumble(results);
    data.isCrit = isRollCrit(results);

    return data;
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
