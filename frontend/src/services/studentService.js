import apiClient from './api';

// Get all students
export const getAllStudents = async () => {
    const response = await apiClient.get('/student-service/api/students/getAllStudents');
    return response.data;
};

// Create new student
export const createStudent = async (student) => {
    const response = await apiClient.post('/student-service/api/students/createStudent', student);
    return response.data;
};

// Update student
export const updateStudent = async (id, student) => {
    const response = await apiClient.put(`/student-service/api/students/${id}`, student);
    return response.data;
};

// Delete student
export const deleteStudent = async (id) => {
    await apiClient.delete(`/student-service/api/students/${id}`);
};
