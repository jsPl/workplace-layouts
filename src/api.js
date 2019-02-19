import { ajax } from 'rxjs/ajax';

const httpHeaders = { 'Content-Type': 'application/json' };

//const API_URL = 'https://my-json-server.typicode.com/jsPl/workplace-layouts';
const API_URL = 'http://localhost:3001';

export const fetchWorkplace = (id) => {
    return ajax.getJSON(`${API_URL}/workplaces/${id}`);
}

export const updateWorkplace = (id, payload) => {
    return ajax.patch(`${API_URL}/workplaces/${id}`, payload, httpHeaders);
}

export const fetchWorkplaces = () => {
    return ajax.getJSON(`${API_URL}/workplaces`);
}