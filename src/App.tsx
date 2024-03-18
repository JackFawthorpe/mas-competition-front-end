import { Button, ThemeProvider } from '@mui/material';
import React from 'react';
import { API } from './apis/API';
import theme from './theme';

function App() {

  const handleClick = async () => {
    console.log(await API.getHello());
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Button onClick={handleClick} variant="contained">Hello</Button>
      </ThemeProvider>
    </div>
  );
}

export default App;
