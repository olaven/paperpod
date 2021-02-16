// stitches.config.ts
import { createCss } from '@stitches/react';

export const { styled, css, getCssString } = createCss({
    theme: {
        colors: {
            primary: 'white',
            secondary: 'black',
            grey: 'hsl(0, 0%, 36%)',
        },
        space: {
            1: '1px',
            2: '2px',
            3: '3px',
            5: '5px',
            8: '8px',
            13: '13px',
            21: '21px',
            34: '34px',
            55: '55px',
            79: '79px',
            114: '114px',
        },
        fontSizes: {
            5: '5px',
            8: '8px',
            13: '13px',
            21: '21px',
            34: '34px',
            55: '55px',
            79: '79px',
            114: '114px',
            223: '223px',
            367: '367px',
        }
    },
    conditions: {
        small: `@media (max-width: 768px)`,
        large: `@media (min-width: 768px)`,
    },
    utils: {},
})