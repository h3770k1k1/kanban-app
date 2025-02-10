import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#E59B34' },
    background: {
      default: '#E59B34',
    },
    customColors: {
      lightYellow: '#E8A84E',
      darkYellow: '#B3742B',
      white: '#F8F9FD',
      brown: '#2B1802',
    },
  },
});

export default theme;
