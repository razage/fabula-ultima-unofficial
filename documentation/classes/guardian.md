# Guardian

## Skills

### Bodyguard

This skill lets you give another creature resistance to everything while using the Guard action. Since it applies to all types, there's no need to manage this within the system. Just remember to adjust **any** damage you take for its duration.

### Defensive Mastery

This skill reduces the damage a player takes as long as they're wearing martial armor or a shield. The system does not check to make sure that they are, nor does it lower numbers rolled by enemies. This is something the player will have to keep track of accordingly.

### Dual Shieldbearer

This ability allows players to equip two shields, gaining the defensive bonuses from both. In addition, they can attack with the dual shields as a **brawling** weapon. Any buffs to brawling weapons from other classes or items should apply to this. I was unable to figure out how to disable the shield attack by default, so all players will be able to do this from the beginning.

They also gain a bonus to their damage based on their current rank of "Defensive Mastery". I'm not able to automatically calculate this, but I did create a spell effect called "Shield Damage (+1)". Players can add this effect once for every rank of "Defensive Mastery" they have, and the damage will adjust accordingly. Alternatively, you can remember to change this on every shield that you get manually.

### Fortress

This skill increases the player's HP by 3 per rank. This is easily managed by going to the effects tab and adding the "HP +3" spell effect once for each rank they have.
