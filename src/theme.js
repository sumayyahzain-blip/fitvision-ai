import { createTheme } from '@mantine/core'

export const theme = createTheme({
    primaryColor: 'violet',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    headings: {
        fontFamily: 'Outfit, sans-serif',
        fontWeight: '700',
    },
    colors: {
        dark: [
            '#C1C2C5',
            '#A6A7AB',
            '#909296',
            '#5c5f66',
            '#373A40',
            '#2C2E33',
            '#1a1a25',
            '#12121a',
            '#0a0a0f',
            '#050507',
        ],
    },
    radius: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '20px',
        xl: '28px',
    },
    components: {
        Button: {
            defaultProps: {
                radius: 'md',
            },
        },
        Card: {
            defaultProps: {
                radius: 'lg',
            },
        },
        Paper: {
            defaultProps: {
                radius: 'lg',
            },
        },
    },
})
