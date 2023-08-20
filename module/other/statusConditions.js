export const statusConditions = [
    {
        id: "guard",
        label: "Guard",
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
];
