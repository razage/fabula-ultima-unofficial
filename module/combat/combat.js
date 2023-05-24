export class FUCombat extends Combat {
    async rollAll(options) {
        let players = [];
        let leaderInit = 0;

        // Default functionality
        await super.rollAll(options);

        // Iterate the turns and figure out who the group leader is
        this.turns.forEach((element) => {
            let actor = game.actors.get(element.actorId);

            if (actor.type === "player") {
                if (actor.system.isLeader) {
                    leaderInit = element.initiative;
                } else {
                    players.push(element);
                }
            }
        });

        // Change player initiatives to match the group leader's initiative.
        players.forEach((element) => {
            element.update({ initiative: leaderInit });
        });

        // Make sure we start at turn 0
        return this.update({ turn: 0, turns: this.setupTurns() });
    }
}
