# Group Sheet

One of the more unique aspects of Fabula Ultima is the group sheet. In the pen and paper version, it basically acts as a way to take notes about the party. In my implementation, it's where you'll do all your group rolls. It also lets you assign a group leader, which is used in group rolls. Because of this, you will need to make sure this sheet exists and you set **one** leader.

## Quirks

The sheet will not stop you from assigning more than one leader. The leader can change at anytime, including before a roll happens. Having more than one leader assigned will create problems with all group rolls, so please avoid doing this. If you want to ensure this never happens, the GM could restrict this sheet for themselves. The downside to that approach is that they will have to perform _all_ group rolls.

The main issue with this sheet is that it grabs all actors of the type "player". If a character dies, they will still participate in group rolls until you delete them. Same applies for back-up characters. Companions and NPCs will not be affected by this, so long as you use the corresponding actor types. I would encourage you to keep a tidy directory and only keep living (and active) players.

If you need to save additional players for some reason, I would export them and reimport them when needed.
