import { fabulaAttackRoll, fabulaSkillRoll, makeGroupRoll } from "../roll/roll.js";

export class FabulaUltimaActorSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["fabulaultima", "sheet", "actor"],
            width: 700,
            height: 800,
            tabs: [
                {
                    navSelector: ".sheet-tabs",
                    contentSelector: ".sheet-body",
                    initial: "attributes",
                },
            ],
        });
    }

    get template() {
        const path = "systems/fabulaultima/templates/actor";

        // unique sheet for each type of item
        return `${path}/actor-${this.actor.type}-sheet.hbs`;
    }

    async getData() {
        const data = super.getData();

        data.effects = data.actor.getEmbeddedCollection("ActiveEffect").contents;

        if (this.actor.type === "companion") {
            data.enrichedDescription = await TextEditor.enrichHTML(this.object.system.description, {
                async: true,
            });
            this._prepareNPCItems(data);
        }

        if (this.actor.type === "group") {
            data.enrichedNotes = await TextEditor.enrichHTML(this.object.system.notes, {
                async: true,
            });
            data.enrichedCreatures = await TextEditor.enrichHTML(this.object.system.creatures, {
                async: true,
            });
            data.enrichedLocations = await TextEditor.enrichHTML(this.object.system.locations, {
                async: true,
            });
            this._prepareGroupData(data);
        }

        if (this.actor.type === "player") {
            data.enrichedNotes = await TextEditor.enrichHTML(this.object.system.notes, {
                async: true,
            });
            this._prepareCharacterItems(data);
        }

        if (this.actor.type === "npc") {
            data.enrichedDescription = await TextEditor.enrichHTML(this.object.system.description, {
                async: true,
            });
            data.enrichedSpecial = await TextEditor.enrichHTML(this.object.system.specialRules, {
                async: true,
            });
            data.enrichedTraits = await TextEditor.enrichHTML(this.object.system.typicalTraits, {
                async: true,
            });
            this._prepareNPCItems(data);
        }

        return data;
    }

    _prepareCharacterItems(sheetData) {
        const actorData = sheetData.actor;
        const accessories = [];
        const arcanum = [];
        const armor = [];
        const bonds = [];
        const classes = [];
        const consumables = [];
        const skills = [];
        const spells = [];
        const weapons = [];
        const skillEffects = [];
        const effects = this.actor.getEmbeddedCollection("ActiveEffect").contents;

        sheetData.items.forEach((item) => {
            switch (item.type) {
                case "accessory":
                    accessories.push(item);
                    break;

                case "arcanum":
                    arcanum.push(item);
                    break;

                case "armor":
                    armor.push(item);
                    break;

                case "bond":
                    bonds.push(item);
                    break;

                case "class":
                    this._applyUnequippableActiveEffect(effects, item);
                    classes.push(item);
                    break;

                case "consumable":
                    consumables.push(item);
                    break;

                case "skill":
                    this._applyUnequippableActiveEffect(effects, item);
                    skills.push(item);
                    break;

                case "spell":
                    spells.push(item);
                    break;

                case "weapon":
                    weapons.push(item);
                    break;

                case "skill-effect":
                    skillEffects.push(item);
                    break;

                default:
                    console.log("itemType ", item.type, " is not currently implemented.");
            }
        });

        // This gets put into the actor object. For consistency, my data is stored in actor.system
        actorData.system.accessories = accessories;
        actorData.system.arcanum = arcanum;
        actorData.system.armor = armor;
        actorData.system.bonds = bonds;
        actorData.system.classes = classes;
        actorData.system.consumables = consumables;
        actorData.system.skills = skills;
        actorData.system.spells = spells;
        actorData.system.weapons = weapons;
        actorData.system.skillEffects = skillEffects;
    }

    _prepareGroupData(sheetData) {
        const groupData = sheetData.actor;
        const groupMembers = [];

        game.actors.forEach((actor) => {
            if (actor.type === "player") groupMembers.push(actor);
        });

        groupData.system.groupMembers = groupMembers;
    }

    _prepareNPCItems(sheetData) {
        const actorData = sheetData.actor;
        const accessories = [];
        const armor = [];
        const skills = [];
        const spells = [];
        const weapons = [];
        const skillEffects = [];
        const effects = this.actor.getEmbeddedCollection("ActiveEffect").contents;

        sheetData.items.forEach((item) => {
            switch (item.type) {
                case "armor":
                    armor.push(item);
                    break;

                case "accessory":
                    accessories.push(item);
                    break;

                case "skill":
                    this._applyUnequippableActiveEffect(effects, item);
                    skills.push(item);
                    break;

                case "spell":
                    spells.push(item);
                    break;

                case "weapon":
                    weapons.push(item);
                    break;

                case "skill-effect":
                    skillEffects.push(item);
            }
        });

        actorData.system.accessories = accessories;
        actorData.system.armor = armor;
        actorData.system.skills = skills;
        actorData.system.spells = spells;
        actorData.system.weapons = weapons;
        actorData.system.skillEffects = skillEffects;
    }

    activateListeners(html) {
        super.activateListeners(html);

        if (!this.options.editable) return;

        html.find(".resource-reset").click((ev) => {
            ev.preventDefault();
            const data = $(ev.currentTarget).data();
            const actor = game.actors.get(data.target);
            let output = {};
            output[data.resource] = {};
            output[data.resource]["value"] = actor.system[data.resource].max;

            actor.update({ data: output });
        });

        // Edit items
        html.find(".item-edit").click((ev) => {
            const parent = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(parent.data("itemId"));

            item.sheet.render(true);
        });

        // Make a roll based on an item's stats
        html.find(".item-roll").click((ev) => {
            ev.preventDefault();

            const parent = $(ev.currentTarget).parents(".item");
            const attackType = ev.currentTarget.dataset.attackType;
            const item = this.actor.items.get(parent.data("itemId"));
            const main = this.actor.system.attributes[item.system.accuracy.mainStat];
            const sec = this.actor.system.attributes[item.system.accuracy.secondaryStat];
            let bonus = 0;

            // Figure out if the item is a weapon or spell and handle accordingly
            if (attackType === "weapon") {
                let weaponType = ev.currentTarget.dataset.weaponType;

                if (weaponType === "shield") {
                    bonus +=
                        this.actor.system.bonuses.accuracy.shield +
                        this.actor.system.bonuses.accuracy.brawling;
                } else {
                    bonus += this.actor.system.bonuses.accuracy[weaponType];
                }
                bonus += this.actor.system.bonuses.accuracy.physical;

                fabulaAttackRoll(this.actor, main, sec, item, "weapon", bonus);
            } else {
                fabulaAttackRoll(this.actor, main, sec, item, "spell");
            }
        });

        // Delete an item
        html.find(".item-delete").click((ev) => {
            const parent = $(ev.currentTarget).parents(".item");
            let options = {};
            const dialog = Dialog.confirm({
                title: game.i18n.localize("FU.UI.areYouSure"),
                yes: () =>
                    this.actor.deleteEmbeddedDocuments("Item", [parent.data("itemId")], options),
                no: () => close,
                defaultYes: false,
            });
        });

        // Create an item
        html.find(".item-create").click(this._onItemCreate.bind(this));

        // Display an item in chat
        html.find(".item-display").click(async (ev) => {
            const itemId = $(ev.currentTarget).data("id");
            const item = this.actor.items.get(itemId);
            let obj = {
                name: item.name,
                img: item.img,
                type: item.type,
            };
            let notes;

            if (obj.type === "spell") {
                notes = TextEditor.enrichHTML(item.system.notes);
                obj.multiValue = item.system.target;

                if (item.system.offensiveSpell) {
                    obj.martial = true;
                } else {
                    obj.noDamage = true;
                }
            }

            if (obj.type === "weapon") {
                notes = TextEditor.enrichHTML(item.system.quality);

                if (item.system.multi.enabled) {
                    obj.multiValue = item.system.multi.value;
                } else {
                    obj.multiValue = 0;
                }

                if (
                    item.system.isMartial.melee ||
                    item.system.isMartial.ranged ||
                    item.system.isMartial.shield
                )
                    obj.martial = true;
            }

            obj.accuracy = `${game.i18n.localize(
                "FU.Short." + item.system.accuracy.mainStat
            )} + ${game.i18n.localize("FU.Short." + item.system.accuracy.secondaryStat)}`;

            if (item.system.accuracy.bonus !== 0) {
                obj.accuracy += ` + ${item.system.accuracy.bonus}`;
            }
            obj.damage = {
                amount: `[${game.i18n.localize("FU.Short.highRoll")} + ${
                    item.system.damage.bonus
                }]`,
                type: item.system.damage.type,
            };

            notes.then((result) => {
                let out = new DOMParser().parseFromString(result, "text/html");
                obj["quality"] = out.body.innerText;
            });

            let content = await renderTemplate(
                "systems/fabulaultima/templates/chat/item-display.hbs",
                obj
            );
            let messageData = {
                speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                content: content,
                type: CONST.CHAT_MESSAGE_TYPES.OOC,
            };
            ChatMessage.create(messageData, {});
        });

        // Update the equipped status for an item
        html.find(".equipped").click(this._onItemEquippedStatusChange.bind(this));

        // Update the leader status for a character
        html.find(".leader").click(this._onGroupLeaderChanged.bind(this));

        // Make a group roll
        html.find(".group-roll").click((ev) => {
            ev.preventDefault();
            const parent = $(ev.currentTarget).parents(".skill-roll-container");
            const main = parent.children(".attributeOne")[0].value;
            const sec = parent.children(".attributeTwo")[0].value;
            let bonus = parent.children("#skill-bonus")[0].value;

            // Basic error  checking
            if (isNaN(bonus)) {
                bonus = 0;
            }

            makeGroupRoll(game.actors, main, sec, bonus);
        });

        // Roll Initiative
        html.find(".initiative-roll").click((ev) => {
            ev.preventDefault();
            makeGroupRoll(game.actors, "dexterity", "insight", 0, true);
        });

        // Open compendium
        html.find(".open-compendium").click((ev) => {
            ev.preventDefault();

            let dataset = ev.currentTarget.dataset;
            let dialog;

            switch (dataset.compendium) {
                case "accessory": {
                    game.packs
                        .find((k) => k.collection === "fabulaultima.accessories")
                        .render(true);
                    break;
                }
                case "armor":
                    game.packs.find((k) => k.collection === "fabulaultima.armor").render(true);
                    break;
                case "classes":
                    game.packs
                        .find((k) => k.collection === "fabulaultima.character-classes")
                        .render(true);
                    break;
                case "consumables":
                    game.packs
                        .find((k) => k.collection === "fabulaultima.consumables")
                        .render(true);
                    break;
                case "npc-skills":
                    game.packs.find((k) => k.collection === "fabulaultima.npc-skills").render(true);
                    break;
                case "skill": {
                    dialog = new Dialog({
                        title: game.i18n.localize("FU.UI.selectCompendium"),
                        buttons: {
                            skills: {
                                label: game.i18n.localize("FU.Plural.skill"),
                                callback: () =>
                                    game.packs
                                        .find((k) => k.collection === "fabulaultima.skills")
                                        .render(true),
                            },
                            heroicSkills: {
                                label: game.i18n.localize("FU.Plural.heroic"),
                                callback: () =>
                                    game.packs
                                        .find((k) => k.collection === "fabulaultima.heroic-skills")
                                        .render(true),
                            },
                        },
                    });
                    dialog.render(true);
                    break;
                }
                case "spell": {
                    game.packs.find((k) => k.collection === "fabulaultima.spells").render(true);
                    break;
                }
                case "weapons":
                    game.packs.find((k) => k.collection === "fabulaultima.weapons").render(true);
                    break;
                case "skill-effects":
                    game.packs
                        .find((k) => k.collection === "fabulaultima.skill-effects")
                        .render(true);
                    break;

                default:
                    console.log(
                        "Compendium ",
                        dataset.compendium,
                        " is not currently implemented."
                    );
            }
        });

        // Make a skill roll
        html.find(".skill-roll").click((ev) => {
            ev.preventDefault();

            const parent = $(ev.currentTarget).parents(".skill-roll-container");
            const main = this.actor.system.attributes[parent.children(".attributeOne")[0].value];
            const sec = this.actor.system.attributes[parent.children(".attributeTwo")[0].value];
            let bonus = parent.children("#skill-bonus")[0].value;

            // Basic error  checking
            if (isNaN(bonus)) {
                bonus = 0;
            }

            fabulaSkillRoll(this.actor, main, sec, bonus);
        });
    }

    _onItemCreate(event) {
        event.preventDefault();

        const header = event.currentTarget;
        const type = header.dataset.type;
        const name = `${game.i18n.localize("FU.Items.Types.new")} ${game.i18n.localize(
            "FU.Items.Types." + type
        )}`;

        const itemData = {
            name: name,
            type: type,
            system: {},
        };

        return this.actor.createEmbeddedDocuments("Item", [itemData]);
    }

    async _onItemEquippedStatusChange(event) {
        event.preventDefault();
        const element = event.currentTarget;
        const dataset = element.dataset;
        const effects = this.actor.getEmbeddedCollection("ActiveEffect").contents;
        const relevantEffects = effects.filter((effect) => effect.origin.endsWith(dataset.id));

        try {
            const item = this.actor.items.get(dataset.id);
            const isEquipped = !item.system.isEquipped;

            // Assumes only 1 ActiveEffect per item
            if (relevantEffects.length > 0) {
                const effect = relevantEffects[0];
                await effect.update({ disabled: !isEquipped });
            }

            item.update({ data: { isEquipped: isEquipped } });
        } catch (ex) {
            console.log(ex);
        }
    }

    async _onGroupLeaderChanged(event) {
        event.preventDefault();
        const element = event.currentTarget;
        const dataset = element.dataset;

        try {
            const player = game.actors.get(dataset.actorId);
            const isLeader = !player.system.isLeader;

            await player.update({ data: { isLeader: isLeader } });

            /* 
            This forces the group sheet to "refresh", since the value being 
            changed is on a different actor instead of an embedded item.
            */
            this.render();
        } catch (ex) {
            console.log(ex);
        }
    }

    _applyUnequippableActiveEffect(effects, item) {
        try {
            let relevantEffects = effects.filter((effect) => effect.origin.endsWith(item._id));

            let effect = relevantEffects[0];

            if (relevantEffects.length === 0) return;

            effect.update({ disabled: false });
        } catch (error) {
            // This effect was applied via the UI and should be ignored.
            return;
        }
    }
}
