import { createTheme } from '@mui/material/styles';

// Define custom palette extensions if needed in a real project, 
// but for this file, we will stick to a robust standard configuration
// tailored for a cinematic, dark-mode editing environment.

export const MovieTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#050505', // Deep black for immersion
      paper: '#121212',   // Standard dark surface
    },
    primary: {
      main: '#00E5FF', // AI/Tech Cyan - representing the "AI Bank" core
      light: '#6EFFFF',
      dark: '#00B2CC',
      contrastText: '#000000',
    },
    secondary: {
      main: '#FFD700', // Cinematic Gold - for "Blockbuster" elements
      light: '#FFFF52',
      dark: '#C7A500',
      contrastText: '#000000',
    },
    error: {
      main: '#CF6679',
    },
    warning: {
      main: '#FF9800',
    },
    info: {
      main: '#2196F3',
    },
    success: {
      main: '#4CAF50', // Money/Growth green
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#A0A0A0',
      disabled: '#505050',
    },
    action: {
      active: '#FFFFFF',
      hover: 'rgba(255, 255, 255, 0.08)',
      selected: 'rgba(255, 255, 255, 0.16)',
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
    },
    subtitle1: {
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      fontSize: '0.75rem',
      fontWeight: 700,
      color: '#A0A0A0',
    },
    body1: {
      lineHeight: 1.6,
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0a0a0a',
          backgroundImage: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03))',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
        containedPrimary: {
          boxShadow: '0 0 10px rgba(0, 229, 255, 0.3)', // Glow effect for AI actions
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#333 #050505',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#050505',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#333',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
          },
        },
      },
    },
  },
});

// Specific style constants for the Movie Studio interface components
export const StudioColors = {
  timelineBackground: '#1a1a1a',
  timelineTrack: '#2a2a2a',
  playhead: '#FF0000',
  clipVideo: '#1E88E5',
  clipAudio: '#43A047',
  clipEffect: '#8E24AA',
  mermaidNodeBackground: '#263238',
  mermaidNodeBorder: '#00E5FF',
  scriptPaper: '#1c1c1c',
  scriptText: '#dcdcdc',
};