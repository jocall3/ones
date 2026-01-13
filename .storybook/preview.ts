import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-styling";

/* TODO: Update import to your tailwind.config.js
const tailwindConfig = require('../path/to/tailwind.config.js'); */

import '../index.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;