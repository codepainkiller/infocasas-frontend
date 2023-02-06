import axios from 'axios';

export const http = axios.create({
    baseURL: 'https://infocasas.test/api/v1',
});

export const getTaskList = async (params = {}) => {
    try {
        const response =  await http.get('/tasks', {params});
        return response.data;
    } catch (err) {
        console.log(err.message);
    }
}

export const createTask = async (name) => {
    try {
        const response = await http.post('/tasks', { name });
        return response.data;
    } catch (err) {
        console.log(err.message)
    }
}

export const updateTask = async (id, data) => {
    try {
        const response = await http.put(`/tasks/${id}`, data);
        return response.data
    } catch (err) {
        console.log(err.message)
    }
}

export const deleteTask = async (id) => {
     try {
         await http.delete(`/tasks/${id}`);
     } catch (err) {
         console.log(err.message)
     }
}