import makeStyles from '@mui/styles/makeStyles';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import PageContainer from "./components/PageContainer";
import Home from "./pages/Home";

const useStyles = makeStyles(() => ({
  appContainer: {
    flexDirection: 'column',
  },
}))

function App() {

  const classes = useStyles()

  return (
    <PageContainer className={classes.appContainer}>
        <Navigation/>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path={"/"} element={<Home/>}/>
          </Routes>
        </BrowserRouter>
    </PageContainer>
  );
}

export default App;
