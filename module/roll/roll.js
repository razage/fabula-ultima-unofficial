export async function fabulaAttackRoll(
    actor,
    mainStat,
    secondaryStat,
    item,
    attackType,
    bonus = 0
) {
    let data = await _fabulaRollCommon(
        actor,
        item,
        mainStat,
        secondaryStat,
        bonus + item.system.accuracy.bonus
    );
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
    let data = await _fabulaRollCommon(actor, null, mainStat, secondaryStat, bonus);

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
            obj.accuracy = {
                base: 0,
                bonus: 0,
                total: obj.roll.total,
            };
            obj.damage = {
                type: data.item.system.damage.type,
                multi: data.item.system.multi.enabled,
                multiValue: data.item.system.multi.value,
            };
            obj.highRoll = data.highRoll;
            obj.itemName = data.item.name;

            // Calculate accuracy bonus
            obj.accuracy.bonus =
                actor.system.bonuses.accuracy.physical +
                actor.system.bonuses.accuracy[data.item.system.category];

            // Deduct the bonus to get the raw roll for the item
            obj.accuracy.base = obj.accuracy.total - obj.accuracy.bonus;

            // Determine the correct damage bonus to apply
            if (data.item.system.category === "shield") {
                obj.damage["bonus"] =
                    actor.system.bonuses.damage.shield +
                    actor.system.bonuses.damage.brawling +
                    data.item.system.damage.bonus;
            } else {
                obj.damage["bonus"] =
                    actor.system.bonuses.damage[data.item.system.category] +
                    data.item.system.damage.bonus;
            }
            obj.damage.bonus += actor.system.bonuses.damage.physical; // This is for bonuses that apply to all damage types

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
            obj.isInitiative = data.isInitiative;

            result = await renderTemplate(
                "systems/fabulaultima/templates/rolls/group-roll.hbs",
                obj
            );

            if (data.isInitiative) {
                flavor = `${game.i18n.localize("FU.Chat.rollingInitiative")}`;
            } else {
                flavor = `${game.i18n.localize(
                    "FU.Chat.rollingGroupSkillCheck"
                )} (${game.i18n.localize("FU.Chat.using")} <b>${game.i18n.localize(
                    "FU.Short." + mainStat
                )} + ${game.i18n.localize("FU.Short." + secondaryStat)}</b>)`;
            }

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
            obj.noDamage = data.item.system.noDamage;
            obj.crit = data.isCrit;
            obj.fumble = data.isFumble;
            obj.mainStat = mainStat;
            obj.secondaryStat = secondaryStat;
            obj.accuracy = {
                base: 0,
                bonus: actor.system.bonuses.accuracy.magic,
                total: obj.roll.total,
            };
            obj.damage = {
                bonus: actor.system.bonuses.damage.magic + data.item.system.damage.bonus,
                type: data.item.system.damage.type,
            };
            obj.highRoll = data.highRoll;
            obj.itemName = data.item.name;

            // Calculate the raw magic check
            obj.accuracy.base = obj.accuracy.total - obj.accuracy.bonus;

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

export async function makeGroupRoll(
    actors,
    mainStat,
    secondaryStat,
    bonus = 0,
    initiativeRoll = false
) {
    let data = { members: {} };
    let successBonus = 0;
    let leader;

    actors.forEach(async (actor) => {
        // Ignore any non-players, like groups
        if (actor.type !== "player") return;

        let isLeader = actor.system.isLeader;
        let actorRollData;
        let statBonus;

        if (!isLeader) {
            if (initiativeRoll) {
                statBonus = actor.system.initiativeMod + bonus;
            } else {
                statBonus = bonus;
            }

            actorRollData = await _fabulaRollCommon(
                actor,
                null,
                actor.system.attributes[mainStat],
                actor.system.attributes[secondaryStat],
                statBonus
            );

            actorRollData.total = actorRollData.rollObj.total;
            data.members[actor.name] = actorRollData;

            if (actorRollData.total >= 10 && !actorRollData.isFumble) {
                successBonus++;
                data.members[actor.name].pass = true;
            } else data.members[actor.name].pass = false;
        } else leader = actor;
    });

    if (leader === undefined) {
        ui.notifications.error(game.i18n.localize("FU.UI.Notifications.noLeader"));
        return;
    }

    let leaderBonus = 0;

    if (initiativeRoll) {
        leaderBonus = successBonus + leader.system.initiativeMod;
    } else {
        leaderBonus = successBonus;
    }

    let leaderRollData = await _fabulaRollCommon(
        leader,
        null,
        leader.system.attributes[mainStat],
        leader.system.attributes[secondaryStat],
        leaderBonus
    );
    data.leader = leaderRollData;
    data.leader.successBonus = successBonus;
    data.leader.total = leaderRollData.rollObj.total;
    data.isInitiative = initiativeRoll;

    await sendRollToChat(leader, mainStat, secondaryStat, "groupRoll", data);
}

async function _fabulaRollCommon(actor, item = null, mainStat, secondaryStat, bonus = 0) {
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
    data.isCrit = isRollCrit(results, actor, item);

    return data;
}

function isRollFumble(rollResults) {
    if (rollResults[0] === 1 && rollResults[1] === 1) return true;
    else return false;
}

function isRollCrit(rollResults, actor, item = null) {
    let frenzyAffectedWeapons = ["brawling", "dagger", "flail", "thrown"];

    // If the character has the frenzy skill, certain weapons crit way more often
    if (item && actor.system.hasFrenzy && frenzyAffectedWeapons.includes(item.system.category)) {
        if (rollResults[0] === rollResults[1] && rollResults[0] > 1 && rollResults[1] > 1)
            return true;
        else return false;
    } else {
        // If the numbers match and they're both 6 or above
        if (rollResults[0] === rollResults[1] && rollResults[0] >= 6 && rollResults[1] >= 6)
            return true;
        else return false;
    }
}
