
type AgentListItem = {
  agentId: string
  teamId: string
  agentName: string
  teamName: string
  rating: number
  status: AgentStatus
};

type AgentStatus = "AVAILABLE" | "UNVALIDATED" | "ILLEGAL_MOVE" | "TIMED_OUT" | "INVALID_SUBMISSION" | "OUT_OF_MEMORY" | "ILLEGAL_IMPORTS" 