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
        icon: "systems/fabulaultima/assets/ui/conditions/curly-wing.svg",
    },
    {
        id: "dazed",
        label: "Dazed",
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
        icon: "systems/fabulaultima/assets/ui/prayer.svg",
    },
    {
        id: "reinforce-dazed",
        label: "Reinforce (Dazed)",
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
        label: "Withstand (WLP)",
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
