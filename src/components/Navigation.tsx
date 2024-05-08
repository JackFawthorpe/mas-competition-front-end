import SettingsIcon from '@mui/icons-material/Settings';
import { Box, IconButton, MenuItem, Tab, Tabs } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { API } from "../apis/API";
import { AuthContext } from "../context/AuthContext";
import DropdownMenu from './DropdownMenu';

const useStyles = makeStyles(() => ({
    navigationBar: {
        width: '100%',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        display: 'flex',
        justifyContent: 'space-between'
    },
  }))

const Navigation = () => {

  const classes = useStyles();

  const {user, setUser} = useContext(AuthContext);

  const handleLogout = () => {
    try {
      API.postLogout();
      setUser(null);
    } catch {
      console.log ("error occured logging out");
    }
  }

  const handleChangePassword = () => {
    handleTabChange(null, null);
      navigate("/change-password");
  }

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, tabValue: number) => {
      setTabValue(tabValue);
    };

  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const path = location.pathname;
    if (path === '/agent-leaderboard') {
        setTabValue(0);
    } else if (path === '/team-leaderboard') {
        setTabValue(1);
    } else if (path === '/agent-submission') {
        setTabValue(2);
    } else {
        setTabValue(null);
    }
}, [location.pathname]);

  return (
    <Box className={classes.navigationBar}>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Agent Leaderboard" onClick={() => {navigate("/agent-leaderboard")}}/>
        <Tab label="Team Leaderboard" onClick={() => {navigate("/team-leaderboard")}}/>
        {user.teamId !== null && <Tab label="Agent Submission" onClick={() => {navigate("/agent-submission")}}/>}
      </Tabs>
      
      <DropdownMenu
        element={
          <IconButton>
            <SettingsIcon />
          </IconButton>
        }
        items={[
          <MenuItem key="Change password button" onClick={handleChangePassword}>Change Password</MenuItem>,
          <MenuItem key="Logout button" onClick={handleLogout}>Logout</MenuItem>
        ]}/>
    </Box>
  )
}

export default Navigation;