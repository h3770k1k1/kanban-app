import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#E59B34' },
    secondary: { main: '#F8F9FD' },
    background: {
      default: '#E59B34',
    },
    customColors: {
      lightYellow: '#E8A84E',
      darkYellow: '#B3742B',
      white: '#F8F9FD',
      brown: '#7D511E',
    },
  },
});

export default theme;
