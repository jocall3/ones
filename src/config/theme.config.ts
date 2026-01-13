import { createTheme, PaletteMode } from '@mui/material/styles';
import { deepPurple, amber, grey, red, green, blue, orange } from '@mui/material/colors';

// Define a custom dark mode palette
const darkPalette = {
  mode: 'dark' as PaletteMode,
  primary: {
    main: deepPurple[400], // A vibrant purple for primary actions
    light: deepPurple[300],
    dark: deepPurple[700],
    contrastText: '#fff',
  },
  secondary: {
    main: amber[300], // A warm amber for secondary actions/highlights
    light: amber[200],
    dark: amber[500],
    contrastText: grey[900],
  },
  error: {
    main: red[500],
    light: red[300],
    dark: red[700],
    contrastText: '#fff',
  },
  warning: {
    main: orange[500],
    light: orange[300],
    dark: orange[700],
    contrastText: '#fff',
  },
  info: {
    main: blue[400],
    light: blue[200],
    dark: blue[600],
    contrastText: '#fff',
  },
  success: {
    main: green[500],
    light: green[300],
    dark: green[700],
    contrastText: '#fff',
  },
  background: {
    default: '#121212', // Very dark grey for the main background
    paper: '#1e1e1e', // Slightly lighter dark grey for cards, modals, etc.
  },
  text: {
    primary: '#e0e0e0', // Light grey for primary text
    secondary: grey[400], // Slightly darker grey for secondary text
    disabled: grey[600],
  },
  divider: grey[700],
};

// Define typography settings
const typography = {
  fontFamily: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 600,
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 500,
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 500,
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 500,
  },
  body1: {
    fontSize: '1rem',
  },
  body2: {
    fontSize: '0.875rem',
  },
  button: {
    textTransform: 'none', // Keep button text as is, no uppercase by default
    fontWeight: 600,
  },
};

// Define component overrides
const components = {
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: darkPalette.background.paper,
        boxShadow: 'none',
        borderBottom: `1px solid ${darkPalette.divider}`,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
      containedPrimary: {
        '&:hover': {
          backgroundColor: deepPurple[600],
        },
      },
      outlinedPrimary: {
        borderColor: deepPurple[400],
        color: deepPurple[400],
        '&:hover': {
          backgroundColor: 'rgba(103, 58, 183, 0.08)', // deepPurple[500] with opacity
          borderColor: deepPurple[500],
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
        backgroundColor: darkPalette.background.paper,
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundColor: darkPalette.background.paper,
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: grey[700],
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: grey[500],
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: deepPurple[400],
        },
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: grey[800],
        color: '#fff',
        fontSize: '0.8rem',
      },
      arrow: {
        color: grey[800],
      },
    },
  },
  MuiDataGrid: { // Assuming DataGrid from @mui/x-data-grid
    styleOverrides: {
      root: {
        border: `1px solid ${darkPalette.divider}`,
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: darkPalette.background.default,
          borderBottom: `1px solid ${darkPalette.divider}`,
        },
        '& .MuiDataGrid-cell': {
          borderColor: darkPalette.divider,
        },
        '& .MuiDataGrid-footerContainer': {
          backgroundColor: darkPalette.background.default,
          borderTop: `1px solid ${darkPalette.divider}`,
        },
      },
    },
  },
};

export const darkTheme = createTheme({
  palette: darkPalette,
  typography: typography,
  components: components,
});

// You can export other themes (e.g., lightTheme) if needed,
// or a function to get the theme based on a mode.
// For this request, only dark mode is explicitly asked for.

// Example of a function to get theme based on mode
export const getAppTheme = (mode: PaletteMode) =>
  createTheme({
    palette: mode === 'dark' ? darkPalette : {
      // Define a light palette here if needed
      mode: 'light',
      primary: {
        main: deepPurple[500],
      },
      secondary: {
        main: amber[500],
      },
      background: {
        default: '#f5f5f5',
        paper: '#ffffff',
      },
      text: {
        primary: grey[900],
        secondary: grey[700],
      },
    },
    typography: typography,
    components: components,
  });