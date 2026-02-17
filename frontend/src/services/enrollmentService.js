import apiClient from './api';

// Enroll student in tech stacks
export const enrollStudent = async (studentName, techStackNames) => {
    const response = await apiClient.post('/enrollment-service/api/enrollments/enroll', null, {
        params: {
            studentName,
            techStackNames
        }
    });
    return response.data;
};

// Get all student profiles
export const getAllProfiles = async () => {
    const response = await apiClient.get('/enrollment-service/api/enrollments/profiles');
    return response.data;
};

// Delete all enrollments for a student
export const deleteEnrollmentsByStudentId = async (studentId) => {
    await apiClient.delete(`/enrollment-service/api/enrollments/student/${studentId}`);
};
