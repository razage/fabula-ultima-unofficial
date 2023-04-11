export async function fabulaAttackRoll(actor, mainStat, secondaryStat, item, attackType) {
    let data = await _fabulaRollCommon(actor, mainStat, secondaryStat, item.system.accuracy.bonus);
    data.item = item;

    switch (attackType) {
        case "weapon":
            // Dual wielding sets the HR to 0
            if (item.system.isDualWielding) {
                data.highRoll = 0;
            }

            await sendRollToChat(actor, mainStat, secondaryStat, "attack", data);
            break;
        case "spell":
            await sendRollToChat(actor, mainStat, secondaryStat, "spell", data);
            break;
    }
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
        case "groupRoll":
            obj.roll = data.leader.rollObj;
            obj.crit = data.leader.isCrit;
            obj.fumble = data.leader.isFumble;
            obj.mainStat = mainStat;
            obj.secondaryStat = secondaryStat;
            obj.total = data.leader.rollObj.total + data.leader.successBonus;
            obj.leader = data.leader;
            obj.members = data.members;

            result = await renderTemplate(
                "systems/fabulaultima/templates/rolls/group-roll.hbs",
                obj
            );
            flavor = `${game.i18n.localize("FU.Chat.rollingGroupSkillCheck")} (${game.i18n.localize(
                "FU.Chat.using"
            )} <b>${game.i18n.localize("FU.Short." + mainStat)} + ${game.i18n.localize(
                "FU.Short." + secondaryStat
            )}</b>)`;
            break;
        case "skill":
            obj.roll = data.rollObj;
            obj.crit = data.isCrit;
            obj.fumble = data.isFumble;
            obj.mainStat = mainStat;
            obj.secondaryStat = secondaryStat;

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
        case "spell":
            obj.roll = data.rollObj;
            obj.crit = data.isCrit;
            obj.fumble = data.isFumble;
            obj.mainStat = mainStat;
            obj.secondaryStat = secondaryStat;
            obj.damage = {
                bonus: data.item.system.damage.bonus,
                type: data.item.system.damage.type,
            };
            obj.highRoll = data.highRoll;
            obj.itemName = data.item.name;
            obj.damage.total = obj.highRoll + obj.damage.bonus;

            result = await renderTemplate(
                "systems/fabulaultima/templates/rolls/attack-roll.hbs",
                obj
            );

            flavor = `${game.i18n.localize("FU.Spells.casting")} <b>${
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
        roll: data.rollObj,
    };

    // Override the roll value if using a group roll, since it's in a different place
    if (rollType === "groupRoll") messageData.roll = data.leader.rollObj;

    // Fallback audio in case the user isn't using DiceSoNice
    AudioHelper.play({ src: "sounds/dice.wav", volume: 0.8, autoplay: true, loop: false }, true);

    ChatMessage.create(messageData, {});
}

export async function makeGroupRoll(actors, mainStat, secondaryStat, bonus = 0) {
    let data = { members: {} };
    let successBonus = 0;
    let leader;

    actors.forEach(async (actor) => {
        let isLeader = actor.system.isLeader;

        // Ignore any non-players, like groups
        if (actor.type !== "player") return;

        if (!isLeader) {
            let actorRollData = await _fabulaRollCommon(
                actor,
                actor.system.attributes[mainStat],
                actor.system.attributes[secondaryStat]
            );

            actorRollData.total = actorRollData.rollObj.total;
            data.members[actor.name] = actorRollData;

            if (actorRollData.total >= 10 && !actorRollData.isFumble) {
                successBonus++;
                data.members[actor.name].pass = true;
            } else data.members[actor.name].pass = false;
        } else leader = actor;
    });

    let leaderRollData = await _fabulaRollCommon(
        leader,
        leader.system.attributes[mainStat],
        leader.system.attributes[secondaryStat],
        successBonus
    );
    data.leader = leaderRollData;
    data.leader.successBonus = successBonus;
    data.leader.total = leaderRollData.rollObj.total + bonus;

    await sendRollToChat(leader, mainStat, secondaryStat, "groupRoll", data);
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

function isRollFumble(rollResults) {
    if (rollResults[0] === 1 && rollResults[1] === 1) return true;
    else return false;
}

function isRollCrit(rollResults) {
    // If the numbers match and they're both 6 or above
    if (rollResults[0] === rollResults[1] && rollResults[0] >= 6 && rollResults[1] >= 6)
        return true;
    else return false;
}
