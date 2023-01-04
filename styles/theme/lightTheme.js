import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  palette: {
    primary: {
      main: '#EB0388',
      lighter: '#FF54BD',
    },
    neutral: {
      main: '#fff',
      contrastText: '#fff',
    },
  },
});

export default lightTheme;
