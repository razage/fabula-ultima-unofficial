export class FUCombatant extends Combatant {
    _getInitiativeFormula() {
        let initiative;

        if (this.isNPC) {
            initiative = `@initiative.value`;
        } else {
            let statPairs = [];
            let leaderStats;
            let formula;

            game.actors.forEach((actor) => {
                if (actor.type === "player") {
                    if (actor.system.isLeader) {
                        let temp = [
                            actor.system.attributes.dexterity.current,
                            actor.system.attributes.insight.current,
                            actor.system.initiativeMod,
                        ];

                        leaderStats = temp;
                    } else {
                        let temp = [
                            actor.system.attributes.dexterity.current,
                            actor.system.attributes.insight.current,
                            actor.system.initiativeMod,
                        ];
                        statPairs.push(temp);
                    }
                }
            });

            formula = `1d${leaderStats[0]}+1d${leaderStats[1]} + ${leaderStats[2]} + {`;

            statPairs.forEach((pair) => {
                formula += `1d${pair[0]}+1d${pair[1]}+${pair[2]},`;
            });
            formula += `}cs>=10`;

            initiative = formula;
        }

        return initiative;
    }
}
