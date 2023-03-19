export class FUActiveEffect extends ActiveEffect {
    apply(actor, change) {
        let key = change.key.split(".");

        // Special handler for resistances
        if (key[1] === "resistances") {
            let actorResistance = actor.system.resistances[key[2]];
            let changeResistance = change.value;

            // If resistant and vulnerable are being applied, become neutral
            if (
                (actorResistance == 1 && changeResistance == -1) ||
                (actorResistance == -1 && changeResistance == 1)
            ) {
                change.value = 0;
            }

            // If immune and the change isn't making you absorb, ignore the change
            if (actorResistance == 2 && changeResistance != 3) {
                change.value = 2;
            }

            // If absorb, no changes necessary
            if (actorResistance == 3) {
                change.value = 3;
            }
        }

        return super.apply(actor, change);
    }

    _applyCustom(actor, change, current, delta, changes) {
        return super._applyCustom(actor, change, current, delta, changes);
    }
}
