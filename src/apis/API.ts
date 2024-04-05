import { api } from "./configs/axiosConfigs";

type CreateAgentResponse = {
    nextRound: string,
    agentID: string
}

export const API = {
    postLogin: async (user: UserLogin): Promise<User> => {
        const formData = new FormData();
        formData.append('email', user.email);
        formData.append('password', user.password);

        const response = await api.post<User>('/login', formData);
        return response.data
    },

    postLogout: async () => {
        await api.post('/logout');
    },

    postChangePassword: async(passwordDetails: ChangePasswordForm, userid: string) => {
        await api.post(`/users/${userid}/password`, passwordDetails);
    },

    getTeam: async(teamID: string): Promise<Team> => {
        const response = await api.get(`/teams/${teamID}`);
        return response.data
    },

    postAgent: async(data): Promise<CreateAgentResponse> => {
        
        const formDataToSend = new FormData();
        formDataToSend.append('source', data.file);

        const jsonDataBlob = new Blob([JSON.stringify({...data, file: undefined})], { type: 'application/json' });
        formDataToSend.append('data', jsonDataBlob);

        const response = await api.post('/agents', formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    },

    getAgents: async(): Promise<AgentListItem[]> => {

        const response = await api.get('/agents');

        return response.data;
    }
}