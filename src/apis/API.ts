import { api } from "./configs/axiosConfigs";

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
        console.log(`Team: ${JSON.stringify(response.data)}`)
        return response.data
    }
}