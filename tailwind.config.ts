import colors from 'tailwindcss/colors';
import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        secondary: colors.slate,
        info: colors.cyan,
        danger: colors.red,
        coldrun: '#2c2c32'
      }
    }
  },
  plugins: []
};
