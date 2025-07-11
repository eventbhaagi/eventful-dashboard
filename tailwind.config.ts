import type { Config } from 'tailwindcss';
import flowbite from 'flowbite/plugin';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',

    // Only this one is needed for Flowbite React
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',

    // Optional: this supports base Flowbite if you're using it too
    './node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite],
};

export default config;
