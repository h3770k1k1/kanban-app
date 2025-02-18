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
    boardButtonsColors:{
      oliveGreen: "rgba(147, 155, 50, 0.9)",
      middleGreen: "rgba(88, 146, 74, 0.8)",
      forestGreen: "rgba(74, 143, 81, 0.8)",
      tealGreen: "rgba(0, 122, 105, 0.8)",
      deepTeal: "rgba(3, 97, 109, 0.8)",
      steelNavy: "rgba(47, 72, 88, 0.8)",


    }
  },
});

export default theme;
