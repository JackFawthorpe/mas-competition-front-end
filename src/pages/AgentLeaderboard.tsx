import { Box, ListItem, Table, TableBody, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { useEffect, useState } from "react";
import { API } from "../apis/API";
import AgentStatusPill from "../components/AgentStatusPill";
import Backdrop from "../components/Backdrop";
import FormCard from "../components/FormCard";
import PageContainer from "../components/PageContainer";

const useStyles = makeStyles(() => ({
  LeaderboardItemContainer: {
    border: '1px solid rgba(0, 0, 0, 0.12)',
    height: '60px',
    justifyContent: 'space-between !important',
    display: 'flex',
    flexDirection: 'row',
  },
  AgentLabel: {
    width: '30%',
  },
  TeamContainer: {
    width: '180px',
    padding: '17px 8px',
    transform: 'skew(-15deg, 0deg)',
    background: 'rgba(0, 0, 0, 0.15)'
  },
  TeamLabel: {
    width: '100%', 
    textAlign: 'center', 
    transform: 'skew(15deg, 0deg)'
  },
  RatingLabel: {
    width: '8%', 
    textAlign: 'end'
  }
}))


const AgentLeaderboard = () => {

  const [agents, setAgents] = useState<AgentListItem[]>([]);

  useEffect(() => {
    const fetchAgents = async () => {
        try {
          const agents = await API.getAgents();
          setAgents(agents);
        } catch (error) {
          console.log(`Failed to fetch agents ${error}`);
          setAgents([]);
        }
    }

    fetchAgents();
  }, [])

  const classes = useStyles()

  return (
    <PageContainer>
      <Backdrop>
        <FormCard sx={agents.length === 0 ? {display: 'none'} : {}}>
          <Table sx={{width: '750px'}}>
            <TableBody>
              {agents.map((agent, index) => 
              <ListItem 
              key={`Agent-${agent.agentId}`}
              sx={{borderRadius: index === 0 ? '20px 20px 0 0' : index === agents.length - 1 ? '0 0 20px 20px' : '0',}}
              className={classes.LeaderboardItemContainer}>
                <Typography>{`${index + 1}. `}</Typography>
                <Typography className={classes.AgentLabel}>{agent.agentName}</Typography>
                <AgentStatusPill status={agent.status}/>
                <Box className={classes.TeamContainer}>
                  <Typography className={classes.TeamLabel}>{agent.teamName}</Typography>
                </Box>
                <Typography className={classes.RatingLabel}>{agent.rating}</Typography>

              </ListItem>)}
            </TableBody>
          </Table>
        </FormCard>
      </Backdrop>
    </PageContainer>
  )
}

export default AgentLeaderboard;