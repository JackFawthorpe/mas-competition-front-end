
type Team = {
  id: string; // UUID identifier
  name: string;
  users: User[];
};

type TeamListItem = {
  agentId: string
  teamName: string
  agentName: string
  teamId: string
  agentRating: number
};
