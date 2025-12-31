import { createTheme, ThemeOptions, responsiveFontSizes } from '@mui/material/styles';

/**
 * Typography constants for the book reader.
 * Using a serif font for the main reading experience to mimic physical books (Dan Brown style).
 * Using sans-serif for UI elements.
 */
const FONT_FAMILY_SERIF = '"Merriweather", "Georgia", "Times New Roman", serif';
const FONT_FAMILY_SANS = '"Inter", "Roboto", "Helvetica", "Arial", sans-serif';

/**
 * Palette definitions for the two distinct reading modes:
 * 1. 'paper': A classic, sepia-toned aesthetic for comfortable long-form reading.
 * 2. 'noir': A high-contrast, dark aesthetic suitable for mystery and low-light environments.
 */

const paperPalette = {
  mode: 'light' as const,
  primary: {
    main: '#5D4037', // Vintage leather brown
    light: '#8B6B61',
    dark: '#321911',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#1A237E', // Deep classic blue (Bank/Corporate trust)
  },
  background: {
    default: '#F9F5EB', // Warm cream/parchment
    paper: '#FDFBF7',   // Slightly lighter page color
  },
  text: {
    primary: '#2C2C2C', // Soft black for reduced eye strain
    secondary: '#5D5D5D',
  },
  divider: 'rgba(93, 64, 55, 0.12)',
};

const noirPalette = {
  mode: 'dark' as const,
  primary: {
    main: '#90CAF9', // AI/Tech Blue
    light: '#E3F2FD',
    dark: '#42A5F5',
    contrastText: '#000000',
  },
  secondary: {
    main: '#FFD700', // Gold (Banking reference)
  },
  background: {
    default: '#000000', // True black for OLED/Noir feel
    paper: '#121212',   // Material dark
  },
  text: {
    primary: '#E0E0E0', // Off-white
    secondary: '#B0BEC5',
  },
  divider: 'rgba(255, 255, 255, 0.12)',
};

/**
 * Generates the MUI Theme based on the selected reading mode.
 * @param mode 'paper' | 'noir'
 * @returns MUI Theme object
 */
export const createBookTheme = (mode: 'paper' | 'noir') => {
  const palette = mode === 'paper' ? paperPalette : noirPalette;

  const baseThemeOptions: ThemeOptions = {
    palette,
    typography: {
      fontFamily: FONT_FAMILY_SANS,
      h1: {
        fontFamily: FONT_FAMILY_SERIF,
        fontWeight: 700,
        letterSpacing: '-0.015em',
      },
      h2: {
        fontFamily: FONT_FAMILY_SERIF,
        fontWeight: 600,
      },
      h3: {
        fontFamily: FONT_FAMILY_SERIF,
        fontWeight: 600,
      },
      h4: {
        fontFamily: FONT_FAMILY_SERIF,
        fontWeight: 600,
      },
      h5: {
        fontFamily: FONT_FAMILY_SERIF,
        fontWeight: 500,
      },
      h6: {
        fontFamily: FONT_FAMILY_SERIF,
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      },
      body1: {
        fontFamily: FONT_FAMILY_SERIF,
        fontSize: '1.125rem', // 18px for comfortable reading
        lineHeight: 1.7,
        textRendering: 'optimizeLegibility',
      },
      body2: {
        fontFamily: FONT_FAMILY_SANS,
        lineHeight: 1.6,
      },
      caption: {
        fontFamily: FONT_FAMILY_SANS,
        color: palette.text.secondary,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: mode === 'paper' ? '#d7ccc8 #f5f5f5' : '#424242 #121212',
            '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
              backgroundColor: mode === 'paper' ? '#f5f5f5' : '#121212',
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
              borderRadius: 8,
              backgroundColor: mode === 'paper' ? '#d7ccc8' : '#424242',
              minHeight: 24,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none', // Remove default MUI gradient in dark mode for cleaner noir look
          },
          elevation1: {
            boxShadow: mode === 'paper' 
              ? '0px 2px 4px -1px rgba(0,0,0,0.05), 0px 4px 5px 0px rgba(0,0,0,0.03), 0px 1px 10px 0px rgba(0,0,0,0.03)'
              : '0px 2px 4px -1px rgba(0,0,0,0.5), 0px 4px 5px 0px rgba(0,0,0,0.3), 0px 1px 10px 0px rgba(0,0,0,0.3)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '2px', // Sharper corners for a more serious/classic feel
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingTop: '2rem',
            paddingBottom: '4rem',
            maxWidth: '800px !important', // Limit line length for readability (approx 60-75 chars)
          },
        },
      },
    },
  };

  let theme = createTheme(baseThemeOptions);
  theme = responsiveFontSizes(theme);

  return theme;
};