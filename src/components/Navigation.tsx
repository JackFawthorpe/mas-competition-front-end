import { Box, Button, Tab, Tabs } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useContext, useState } from "react";
import { API } from "../apis/API";
import { AuthContext } from "../context/AuthContext";

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

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
      };

    return (
        <Box className={classes.navigationBar}>
            <Tabs value={value} onChange={handleChange} >
                    <Tab label="Agent Leaderboard" />
                    <Tab label="Team Leaderboard"/>
                    <Tab label="Agent Submission"/>
                </Tabs>

                <Box sx={{alignSelf: 'center', padding: '5px'}}>
                    <Button variant="contained" onClick={handleLogout}>Logout</Button>
                </Box>
        </Box>
    )
}

export default Navigation;