# Fabula Ultima (Unofficial) for Foundry VTT

A fan-made system for Foundry Virtual Tabletop to implement the ruleset for _Fabula Ultima_, a TTJRPG published by NEED GAMES!

## Disclaimer

This system is unaffiliated with the creators or the publisher. The software is not made to invalidate or replace the official core rulebook. The only intention is to manage the math and dice rolls and allow Foundry users to play Fabula Ultima more conveniently. Please support the creator and/or his publisher by buying the book or supporting his Patreon.

-   [Core Rules (DriveThruRPG, PDF)](https://www.drivethrurpg.com/product/410108/Fabula-Ultima-TTJRPG)
-   [Core Rules (Amazon, Physical)](https://www.amazon.com/dp/B0C34VZ87R)
-   [Patreon](https://www.patreon.com/roosterema)

## The UI

Early on in the project, I decided to make my sheets mimic the old-school _Final Fantasy_ menus. I personally like this style and I will not be changing it. Since somebody requested it early on in development, I did add some configuration options to change the color. It is not perfect and I will probably revisit that at a later date. Ultimately, I would like to make a few UI designs and just let you pick from those. It will take some time for me to add this and it isn't my top priority, so stay tuned.

## Status

This project is still in development and currently in a beta phase. I am testing it with a group I am running and mostly focusing on bugs.

### Future Content

If/when new DLC or expansion modules are released for Fabula Ultima, I will probably get around to adding it in eventually. Certain things I will not add myself, such as major mechanic variants. I know there's something on the creator's Patreon about class spheres and that would be a large departure from what I've made, so I will not implement that, for example.

I am working on a basic implementation of the Ace of Cards. GMs won't enjoy running it, especially if there's multiple players using that class.

## Installation

In order to install this system, you will need to download this repository as a zip file and extract it to your foundry/systems folder. Alternatively, you can use the url `https://raw.githubusercontent.com/razage/fabula-ultima-unofficial/master/system.json` in the "Manifest URL" field when you click "Install System"

### Recommended Modules

I've added a few modules that will make running this game _much_ easier. They are not required to operate, so I made them recommended. Here's my reasoning for each.

-   Challenge Tracker
    -   This game uses clocks. This is my preferred clock plugin. Use whatever one you prefer if you don't want to use this. My system does **not** implement clocks otherwise.
-   Lancer Initiative
    -   Fabula Ultima's initiative system is largely incompatible with Foundry. My implementation sucked, so I found this as a good alternative. With this, you just need to use the party sheet to make an initiative roll (DEX + INS) and compare it to the highest enemy initiative. It even lets you give bosses multiple turns.

# Copyright

The code in this repository was written by Razage &copy; 2023 under the MIT license. _Fabula Ultima_ was written by Emanuele Galletto and published by NEED GAMES! This was made as a fan project for said game and not intended to replace the core rulebook in any way.

## Icons

Due to the length of the list of icons in use, this has been moved to its own file. Please see [this file](./COPYRIGHT.md) all of the credits and information.
