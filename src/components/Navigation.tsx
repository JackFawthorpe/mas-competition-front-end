import SettingsIcon from '@mui/icons-material/Settings';
import { Box, IconButton, MenuItem, Tab, Tabs } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
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

    const {setUser} = useContext(AuthContext);

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

    return (
        <Box className={classes.navigationBar}>
            <Tabs value={tabValue} onChange={handleTabChange} >
                    <Tab label="Agent Leaderboard" onClick={() => {navigate("/agents")}}/>
                    <Tab label="Team Leaderboard" onClick={() => {navigate("/teams")}}/>
                    <Tab label="Agent Submission" onClick={() => {navigate("/agent-submission")}}/>
                </Tabs>

                <DropdownMenu
                  element={
                    <IconButton>
                      <SettingsIcon />
                    </IconButton>
                  }
                  items={[
                    <MenuItem key="Logout button" onClick={handleLogout}>Logout</MenuItem>,
                    <MenuItem key="Change password button" onClick={handleChangePassword}>Change Password</MenuItem>
                  ]}/>
        </Box>
    )
}

export default Navigation;