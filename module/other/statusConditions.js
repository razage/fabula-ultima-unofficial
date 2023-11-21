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
        label: "Surrendered",
        description: "You have been defeated and surrendered to the enemy.",
        icon: "systems/fabulaultima/assets/ui/conditions/death-skull.svg",
    },
    {
        id: "crisis",
        label: "Crisis",
        description: "You are at half health or lower. Nearing defeat...",
        icon: "systems/fabulaultima/assets/ui/conditions/heart-beats.svg",
        statuses: ["crisis"],
    },
    {
        id: "guard",
        label: "Guard",
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
        label: "Flying",
        description:
            "May not be targeted by melee attacks. Can be forced to land with an opportunity or certain effects. This creature will automatically land when it enters Crisis.",
        icon: "systems/fabulaultima/assets/ui/conditions/curly-wing.svg",
    },
    {
        id: "dazed",
        label: "Dazed",
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
        label: "Enraged",
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
        label: "Poisoned",
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
        label: "Shaken",
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
        label: "Slow",
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
        label: "Weak",
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
        label: "Awaken (DEX)",
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
        label: "Awaken (INS)",
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
        label: "Awaken (MIG)",
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
        label: "Awaken (WLP)",
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
        label: "Elemental Shroud (Air)",
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
        label: "Elemental Shroud (Bolt)",
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
        label: "Resistance (Dark)",
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
        label: "Elemental Shroud (Earth)",
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
        label: "Elemental Shroud (Fire)",
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
        label: "Elemental Shroud (Ice)",
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
        label: "Resistance (Light)",
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
        label: "Resistance (Physical)",
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
        label: "Resistance (Poison)",
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
        label: "Mercy",
        description:
            "The next time damage brings you to 0 Hit Points, you survive with 1 Hit Point instead.",
        icon: "systems/fabulaultima/assets/ui/prayer.svg",
    },
    {
        id: "reinforce-dazed",
        label: "Reinforce (Dazed)",
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
        label: "Reinforce (Enraged)",
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
        label: "Reinforce (Poisoned)",
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
        label: "Reinforce (Shaken)",
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
        label: "Reinforce (Slow)",
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
        label: "Reinforce (Weak)",
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
        label: "Vulnerability (Air)",
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
        label: "Vulnerability (Bolt)",
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
        label: "Vulnerability (Dark)",
        description: "2x damage from all sources that deal Dark damage.",
        icon: "systems/fabulaultima/assets/ui/conditions/armor-downgrade-dark.svg",
        changes: [
            {
                key: "system.resistances.earth",
                mode: 3,
                value: -1,
            },
        ],
    },
    {
        id: "vulnerability-earth",
        label: "Vulnerability (Earth)",
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
        label: "Vulnerability (Fire)",
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
        label: "Vulnerability (Ice)",
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
        label: "Vulnerability (Light)",
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
        label: "Vulnerability (Poison)",
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
        label: "Withstand (MIG)",
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
        label: "Willpower (WLP) is increased by one die size (max d12).",
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
        label: "Accuracy Bonus (+1)",
        description: "You have a +1 on all Accuracy Checks.",
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
