import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    lightGreen: { main: '#99C0BF' },
    beige: { main: '#F1E5D7' },
    lightBlue: { main: '#A7D0D7' },
    grey: { main: '#798686' },
    teal: { main: '#669E9C' },
    darkGreen: { main: '#1B4F50' },
  },
});

export default theme;
export { ThemeProvider };