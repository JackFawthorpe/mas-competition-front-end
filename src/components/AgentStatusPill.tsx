import { Chip } from "@mui/material";

const AgentStatusPill = ({status}: {status: AgentStatus}) => {
    return (
      <Chip 
        sx={{width: '110px'}}
        color={status === 'AVAILABLE' || status === 'UNVALIDATED' ? 'success' : 'warning'}
        label={status.replace('_', ' ').toLowerCase()}
        />
    )
}

export default AgentStatusPill;