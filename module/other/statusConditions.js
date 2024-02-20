/*  Modes
0   Custom
1   Multiply
2   Add
3   Downgrade
4   Upgrade
5   Override
*/
export const statusConditions = [
    {
        id: "dead",
        label: "FU.Effects.dead.label",
        description: "You have been defeated and surrendered to the enemy.",
        icon: "systems/fabulaultima/assets/ui/conditions/death-skull.svg",
    },
    {
        id: "crisis",
        label: "FU.Effects.crisis.label",
        description: "You are at half health or lower. Nearing defeat...",
        icon: "systems/fabulaultima/assets/ui/conditions/heart-beats.svg",
        statuses: ["crisis"],
    },
    {
        id: "guard",
        label: "FU.Effects.guard.label",
        description:
            "You enter a defensive stance, taking half damage from all sources until your next turn.",
        icon: "systems/fabulaultima/assets/ui/conditions/round-shield.svg",
        changes: [
            {
                key: "system.resistances.air",
                mode: 4,
                value: 1,
            },
            {
                key: "system.resistances.bolt",
                mode: 4,
                value: 1,
            },
            {
                key: "system.resistances.dark",
                mode: 4,
                value: 1,
            },
            {
                key: "system.resistances.earth",
                mode: 4,
                value: 1,
            },
            {
                key: "system.resistances.fire",
                mode: 4,
                value: 1,
            },
            {
                key: "system.resistances.ice",
                mode: 4,
                value: 1,
            },
            {
                key: "system.resistances.light",
                mode: 4,
                value: 1,
            },
            {
                key: "system.resistances.physical",
                mode: 4,
                value: 1,
            },
            {
                key: "system.resistances.poison",
                mode: 4,
                value: 1,
            },
        ],
    },
    {
        id: "flying",
        label: "FU.Effects.flying.label",
        description:
            "May not be targeted by melee attacks. Can be forced to land with an opportunity or certain effects. This creature will automatically land when it enters Crisis.",
        icon: "systems/fabulaultima/assets/ui/conditions/curly-wing.svg",
    },
    {
        id: "dazed",
        label: "FU.Effects.dazed.label",
        description: "Insight (INS) is lowered by one die size (min. d6).",
        icon: "systems/fabulaultima/assets/ui/knocked-out-stars.svg",
        changes: [
            {
                key: "system.attributes.insight.bonus",
                mode: 2,
                value: -2,
            },
        ],
    },
    {
        id: "enraged",
        label: "FU.Effects.enraged.label",
        description: "Dexterity (DEX) and Insight (INS) are lowered by one die size (min. d6).",
        icon: "systems/fabulaultima/assets/ui/enrage.svg",
        changes: [
            {
                key: "system.attributes.dexterity.bonus",
                mode: 2,
                value: -2,
            },
            {
                key: "system.attributes.insight.bonus",
                mode: 2,
                value: -2,
            },
        ],
    },
    {
        id: "poisoned",
        label: "FU.Effects.poisoned.label",
        description: "Might (MIG) and Willpower (WLP) are lowered by one die size (min. d6).",
        icon: "systems/fabulaultima/assets/ui/poison-bottle.svg",
        changes: [
            {
                key: "system.attributes.might.bonus",
                mode: 2,
                value: -2,
            },
            {
                key: "system.attributes.willpower.bonus",
                mode: 2,
                value: -2,
            },
        ],
    },
    {
        id: "shaken",
        label: "FU.Effects.shaken.label",
        description: "Willpower (WLP) is lowered by one die size (min. d6)",
        icon: "systems/fabulaultima/assets/ui/terror.svg",
        changes: [
            {
                key: "system.attributes.willpower.bonus",
                mode: 2,
                value: -2,
            },
        ],
    },
    {
        id: "slow",
        label: "FU.Effects.slow.label",
        description: "Dexterity (DEX) is lowered by one die size (min. d6).",
        icon: "systems/fabulaultima/assets/ui/tortoise.svg",
        changes: [
            {
                key: "system.attributes.dexterity.bonus",
                mode: 2,
                value: -2,
            },
        ],
    },
    {
        id: "weak",
        label: "FU.Effects.weak.label",
        description: "Might (MIG) is lowered by one die size (min. d6).",
        icon: "systems/fabulaultima/assets/ui/back-pain.svg",
        changes: [
            {
                key: "system.attributes.might.bonus",
                mode: 2,
                value: -2,
            },
        ],
    },
    {
        id: "awaken-dex",
        label: "FU.Effects.awaken-dex.label",
        description: "Dexterity (DEX) is increased by one die size (max d12).",
        icon: "systems/fabulaultima/assets/ui/conditions/extra-lucid-dex.svg",
        changes: [
            {
                key: "system.attributes.dexterity.bonus",
                mode: 2,
                value: 2,
            },
        ],
    },
    {
        id: "awaken-ins",
        label: "FU.Effects.awaken-ins.label",
        description: "Insight (INS) is increased by one die size (max d12).",
        icon: "systems/fabulaultima/assets/ui/conditions/extra-lucid-ins.svg",
        changes: [
            {
                key: "system.attributes.insight.bonus",
                mode: 2,
                value: 2,
            },
        ],
    },
    {
        id: "awaken-mig",
        label: "FU.Effects.awaken-mig.label",
        description: "Might (MIG) is increased by one die size (max d12).",
        icon: "systems/fabulaultima/assets/ui/conditions/extra-lucid-mig.svg",
        changes: [
            {
                key: "system.attributes.might.bonus",
                mode: 2,
                value: 2,
            },
        ],
    },
    {
        id: "awaken-wlp",
        label: "FU.Effects.awaken-wlp.label",
        description: "Willpower (WLP) is increased by one die size (max d12).",
        icon: "systems/fabulaultima/assets/ui/conditions/extra-lucid-wlp.svg",
        changes: [
            {
                key: "system.attributes.willpower.bonus",
                mode: 2,
                value: 2,
            },
        ],
    },
    {
        id: "elemental-shroud-air",
        label: "FU.Effects.elemental-shroud-air.label",
        description: "1/2 damage from all sources that deal Air damage.",
        icon: "systems/fabulaultima/assets/ui/conditions/winged-shield.svg",
        changes: [
            {
                key: "system.resistances.air",
                mode: 4,
                value: 1,
            },
        ],
    },
    {
        id: "elemental-shroud-bolt",
        label: "FU.Effects.elemental-shroud-bolt.label",
        description: "1/2 damage from all sources that deal Bolt damage.",
        icon: "systems/fabulaultima/assets/ui/conditions/lightning-shield.svg",
        changes: [
            {
                key: "system.resistances.bolt",
                mode: 4,
                value: 1,
            },
        ],
    },
    {
        id: "resistance-dark",
        label: "FU.Effects.resistance-dark.label",
        description: "1/2 damage from all sources that deal Dark damage.",
        icon: "systems/fabulaultima/assets/ui/conditions/skull-shield.svg",
        changes: [
            {
                key: "system.resistances.dark",
                mode: 4,
                value: 1,
            },
        ],
    },
    {
        id: "elemental-shroud-earth",
        label: "FU.Effects.resistance-earth.label",
        description: "1/2 damage from all sources that deal Earth damage.",
        icon: "systems/fabulaultima/assets/ui/conditions/cracked-shield.svg",
        changes: [
            {
                key: "system.resistances.earth",
                mode: 4,
                value: 1,
            },
        ],
    },
    {
        id: "elemental-shroud-fire",
        label: "FU.Effects.resistance-fire.label",
        description: "1/2 damage from all sources that deal Fire damage.",
        icon: "systems/fabulaultima/assets/ui/conditions/fire-shield.svg",
        changes: [
            {
                key: "system.resistances.fire",
                mode: 4,
                value: 1,
            },
        ],
    },
    {
        id: "elemental-shroud-ice",
        label: "FU.Effects.resistance-ice.label",
        description: "1/2 damage from all sources that deal Ice damage.",
        icon: "systems/fabulaultima/assets/ui/conditions/ice-shield.svg",
        changes: [
            {
                key: "system.resistances.ice",
                mode: 4,
                value: 1,
            },
        ],
    },
    {
        id: "resistance-light",
        label: "FU.Effects.resistance-light.label",
        description: "1/2 damage from all sources that deal Light damage.",
        icon: "systems/fabulaultima/assets/ui/conditions/rosa-shield.svg",
        changes: [
            {
                key: "system.resistances.light",
                mode: 4,
                value: 1,
            },
        ],
    },
    {
        id: "resistance-physical",
        label: "FU.Effects.resistance-physical.label",
        description: "1/2 damage from all sources that deal Physical damage.",
        icon: "systems/fabulaultima/assets/ui/conditions/shieldcomb.svg",
        changes: [
            {
                key: "system.resistances.physical",
                mode: 4,
                value: 1,
            },
        ],
    },
    {
        id: "resistance-poison",
        label: "FU.Effects.resistance-poison.label",
        description: "1/2 damage from all sources that deal Poison damage.",
        icon: "systems/fabulaultima/assets/ui/conditions/eye-shield.svg",
        changes: [
            {
                key: "system.resistances.poison",
                mode: 4,
                value: 1,
            },
        ],
    },
    {
        id: "mercy",
        label: "FU.Effects.mercy.label",
        description:
            "The next time damage brings you to 0 Hit Points, you survive with 1 Hit Point instead.",
        icon: "systems/fabulaultima/assets/ui/prayer.svg",
    },
    {
        id: "reinforce-dazed",
        label: "FU.Effects.reinforce-dazed",
        description: "Immune to the Dazed status effect.",
        icon: "systems/fabulaultima/assets/ui/conditions/energy-shield-dazed.svg",
        changes: [
            {
                key: "system.statuses.dazed.immune",
                mode: 4,
                value: true,
            },
        ],
    },
    {
        id: "reinforce-enraged",
        label: "FU.Effects.reinforce-enraged",
        description: "Immune to the Enraged status effect.",
        icon: "systems/fabulaultima/assets/ui/conditions/energy-shield-enraged.svg",
        changes: [
            {
                key: "system.statuses.enraged.immune",
                mode: 4,
                value: true,
            },
        ],
    },
    {
        id: "reinforce-poisoned",
        label: "FU.Effects.reinforce-poisoned",
        description: "Immune to the Poisoned status effect.",
        icon: "systems/fabulaultima/assets/ui/conditions/energy-shield-poisoned.svg",
        changes: [
            {
                key: "system.statuses.poisoned.immune",
                mode: 4,
                value: true,
            },
        ],
    },
    {
        id: "reinforce-shaken",
        label: "FU.Effects.reinforce-shaken",
        description: "Immune to the Shaken status effect.",
        icon: "systems/fabulaultima/assets/ui/conditions/energy-shield-shaken.svg",
        changes: [
            {
                key: "system.statuses.shaken.immune",
                mode: 4,
                value: true,
            },
        ],
    },
    {
        id: "reinforce-slow",
        label: "FU.Effects.reinforce-slow",
        description: "Immune to the Slow status effect.",
        icon: "systems/fabulaultima/assets/ui/conditions/energy-shield-slow.svg",
        changes: [
            {
                key: "system.statuses.slow.immune",
                mode: 4,
                value: true,
            },
        ],
    },
    {
        id: "reinforce-weak",
        label: "FU.Effects.reinforce-weak",
        description: "Immune to the Weak status effect.",
        icon: "systems/fabulaultima/assets/ui/conditions/energy-shield-weak.svg",
        changes: [
            {
                key: "system.statuses.weak.immune",
                mode: 4,
                value: true,
            },
        ],
    },
    {
        id: "vulnerability-air",
        label: "FU.Effects.vulnerability-air",
        description: "2x damage from all sources that deal Air damage.",
        icon: "systems/fabulaultima/assets/ui/conditions/armor-downgrade-air.svg",
        changes: [
            {
                key: "system.resistances.air",
                mode: 3,
                value: -1,
            },
        ],
    },
    {
        id: "vulnerability-bolt",
        description: "2x damage from all sources that deal Bolt damage.",
        label: "FU.Effects.vulnerability-bol",
        icon: "systems/fabulaultima/assets/ui/conditions/armor-downgrade-bolt.svg",
        changes: [
            {
                key: "system.resistances.bolt",
                mode: 3,
                value: -1,
            },
        ],
    },
    {
        id: "vulnerability-dark",
        label: "FU.Effects.vulnerability-dark",
        description: "2x damage from all sources that deal Dark damage.",
        icon: "systems/fabulaultima/assets/ui/conditions/armor-downgrade-dark.svg",
        changes: [
            {
                key: "system.resistances.dark",
                mode: 3,
                value: -1,
            },
        ],
    },
    {
        id: "vulnerability-earth",
        label: "FU.Effects.vulnerability-earth",
        description: "2x damage from all sources that deal Earth damage.",
        icon: "systems/fabulaultima/assets/ui/conditions/armor-downgrade-earth.svg",
        changes: [
            {
                key: "system.resistances.earth",
                mode: 3,
                value: -1,
            },
        ],
    },
    {
        id: "vulnerability-fire",
        label: "FU.Effects.vulnerability-fire",
        description: "2x damage from all sources that deal Fire damage.",
        icon: "systems/fabulaultima/assets/ui/conditions/armor-downgrade-fire.svg",
        changes: [
            {
                key: "system.resistances.fire",
                mode: 3,
                value: -1,
            },
        ],
    },
    {
        id: "vulnerability-ice",
        label: "FU.Effects.vulnerability-ice",
        description: "2x damage from all sources that deal Ice damage.",
        icon: "systems/fabulaultima/assets/ui/conditions/armor-downgrade-ice.svg",
        changes: [
            {
                key: "system.resistances.ice",
                mode: 3,
                value: -1,
            },
        ],
    },
    {
        id: "vulnerability-light",
        label: "FU.Effects.vulnerability-light",
        description: "2x damage from all sources that deal Light damage.",
        icon: "systems/fabulaultima/assets/ui/conditions/armor-downgrade-light.svg",
        changes: [
            {
                key: "system.resistances.light",
                mode: 3,
                value: -1,
            },
        ],
    },
    {
        id: "vulnerability-poison",
        label: "FU.Effects.vulnerability-poison",
        description: "2x damage from all sources that deal Poison damage.",
        icon: "systems/fabulaultima/assets/ui/conditions/armor-downgrade-poison.svg",
        changes: [
            {
                key: "system.resistances.poison",
                mode: 3,
                value: -1,
            },
        ],
    },
    {
        id: "withstand-mig",
        label: "FU.Effects.withstand-mig.label",
        description: "Might (MIG) is increased by one die size (max d12).",
        icon: "systems/fabulaultima/assets/ui/conditions/internal-injury-mig.svg",
        changes: [
            {
                key: "system.attributes.might.bonus",
                mode: 2,
                value: 2,
            },
        ],
    },
    {
        id: "withstand-wlp",
        label: "FU.Effects.withstand-wlp.label",
        description: "Willpower (WLP) is increased by one die size (max d12).",
        icon: "systems/fabulaultima/assets/ui/conditions/internal-injury-wlp.svg",
        changes: [
            {
                key: "system.attributes.willpower.bonus",
                mode: 2,
                value: 2,
            },
        ],
    },
    {
        id: "accuracy-buff-1",
        label: "FU.Effects.accuracy-buff-1.label",
        description: "FU.Effects.accuracy-buff-1.description",
        icon: "systems/fabulaultima/assets/ui/conditions/bullseye.svg",
        changes: [
            {
                key: "system.bonuses.accuracy.physical",
                mode: 2,
                value: 1,
            },
        ],
    },
];
