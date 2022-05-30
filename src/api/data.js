import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


export async function getAllEvents() {
    return api.get('/data/theaters?sortBy=_createdOn%20desc&distinct=title');
}

export async function getArticleById(id) {
    return api.get('/data/theaters/' + id);
}

export async function getMyArticles(userId) {
    return api.get(`/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function createEvent(data) {
    return api.post('/data/theaters', data);
}

export async function editArticle(id, data) {
    return api.put('/data/theaters/'+ id, data);
}

export async function deleteArticle(id) {
    return api.del('/data/theaters/' + id);
}