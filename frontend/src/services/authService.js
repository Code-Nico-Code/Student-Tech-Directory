import apiClient from './api';

export const authService = {
    login: async (username, password) => {
        const response = await apiClient.post('/auth/login', {
            username,
            password
        });
        return response.data;
    },

    register: async (username, password, role = null) => {
        const data = { username, password };
        if (role) {
            data.role = role;
        }
        const response = await apiClient.post('/auth/register', data);
        return response.data;
    }
};

export default authService;
