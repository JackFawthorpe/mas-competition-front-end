import { Box, ListItem, Table, TableBody, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { useEffect, useState } from "react";
import { API } from "../apis/API";
import Backdrop from "../components/Backdrop";
import FormCard from "../components/FormCard";
import PageContainer from "../components/PageContainer";

const useStyles = makeStyles(() => ({
  LeaderboardItemContainer: {
    border: '1px solid rgba(0, 0, 0, 0.12)',
    height: '70px',
    justifyContent: 'space-between !important',
    display: 'flex',
    flexDirection: 'row',
  },
  RatingLabel: {
    width: '8%', 
    textAlign: 'end'
  }
}))


const TeamLeaderboard = () => {

  const [teams, setTeams] = useState<TeamListItem[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
        try {
          const teams = await API.getTeams();
          setTeams(teams);
        } catch (error) {
          console.log(`Failed to fetch teams ${error}`);
          setTeams([]);
        }
    }

    fetchTeams();
  }, [])

  const classes = useStyles()

  return (
    <PageContainer>
      <Backdrop>
        <FormCard sx={teams.length === 0 ? {display: 'none'} : {}}>
          <Table sx={{width: '400px'}}>
            <TableBody>
              {teams.map((team, index) => 
              <ListItem 
              key={`Team-${team.teamId}`}
              sx={{borderRadius: index === 0 ? '20px 20px 0 0' : index === teams.length - 1 ? '0 0 20px 20px' : '0',}}
              className={classes.LeaderboardItemContainer}>
                <Box sx={{display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center'}}>
                  <Typography variant="h5" sx={{width: 'fit-content'}}>{`${index + 1}. `}</Typography>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <Typography variant="h6">{team.teamName}</Typography>
                    <Typography variant="subtitle1">{team.agentName}</Typography>
                  </Box>
                </Box>
                <Typography className={classes.RatingLabel}>{parseInt(`${team.agentRating}`, 10)}</Typography>
              </ListItem>)}
            </TableBody>
          </Table>
        </FormCard>
      </Backdrop>
    </PageContainer>
  )
}

export default TeamLeaderboard;