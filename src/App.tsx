import makeStyles from '@mui/styles/makeStyles';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import PageContainer from "./components/PageContainer";
import SnackbarProvider from './context/SnackbarProvider';
import ChangePasswordPage from './pages/ChangePassword';
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
    <SnackbarProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Navigation/>
        <Routes>
          <Route path={"/change-password"} element={<ChangePasswordPage/>}/>
          <Route path={"/"} element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
        
    </PageContainer>
  );
}

export default App;
