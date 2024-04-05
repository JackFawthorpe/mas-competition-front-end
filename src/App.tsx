import makeStyles from '@mui/styles/makeStyles';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import PageContainer from "./components/PageContainer";
import SnackbarProvider from './context/SnackbarProvider';
import AgentLeaderboard from './pages/AgentLeaderboard';
import AgentSubmission from './pages/AgentSubmission';
import ChangePasswordPage from './pages/ChangePassword';

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
          <Route path={"/agent-submission"} element={<AgentSubmission/>}/>
          <Route path={"/agent-leaderboard"} element={<AgentLeaderboard/>}/>
          <Route path={"/"} element={<AgentLeaderboard/>}/>
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
        
    </PageContainer>
  );
}

export default App;
