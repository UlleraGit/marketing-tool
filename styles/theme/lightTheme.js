import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  palette: {
    primary: {
      main: '#0000FF',
      lighter: '#FF54BD',
    },
    neutral: {
      main: '#fff',
      contrastText: '#fff',
    },
  },
});

export default lightTheme;
