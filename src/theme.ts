import { orange } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export default createTheme({
  palette: {
    primary: {
      main: orange[300],
    }
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: '0.875rem',
          padding: '0px',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: 'rgba(0, 0, 0, 0.6)',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: 'black'
          }
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          margin: '2px 0px 0px 2px'
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
          input: {
              padding: '8px',
              '&.Mui-disabled': {
                WebkitTextFillColor: 'black'
              }
          },
      },
    },
  },
});
