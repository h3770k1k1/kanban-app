import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    darkGreen: { main: '#1B4F50' },
    backlog: { main: '#99C0BF' },
    todo: { main: '#F1E5D7' },
    inProgress: { main: '#A7D0D7' },
    done: { main: '#798686' },
    link: { main: '#669E9C' },
  },
});

export default theme;
export { ThemeProvider };