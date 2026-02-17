import apiClient from './api';

// Get all tech stacks
export const getAllTechStacks = async () => {
    const response = await apiClient.get('/tech-stack-service/api/techstacks/getAllTechStacks');
    return response.data;
};

// Create new tech stack
export const createTechStack = async (techStack) => {
    const response = await apiClient.post('/tech-stack-service/api/techstacks/createTechStack', techStack);
    return response.data;
};

// Update tech stack
export const updateTechStack = async (id, techStack) => {
    const response = await apiClient.put(`/tech-stack-service/api/techstacks/${id}`, techStack);
    return response.data;
};

// Delete tech stack
export const deleteTechStack = async (id) => {
    await apiClient.delete(`/tech-stack-service/api/techstacks/${id}`);
};
