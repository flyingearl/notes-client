import {  apiUrl } from '../../../helpers'

export const getNotes = ({ commit }) => {
    return axios.get(`${apiUrl()}/api/notes`).then((response) => {
        commit('setNotes', response.data.data)
    }).catch((error) => {
        console.log(error)
    })
}

export const createNote = ({ commit }, newTitle) => {
    return axios.post(`${apiUrl()}/api/notes`, {title: newTitle}).then((response) => {
        commit('addNote', response.data.data)
        commit('setSelected', response.data.data)
        return
    }).catch((error) => {
        console.log(error)
    })
}

export const setSelected = ({ commit }, note) => {
    commit('setSelected', note)
}

export const updateNote = ({ commit }, note) => {
    return axios.patch(`${apiUrl()}/api/notes/${note.id}`, note).then((response) => {
        commit('setSelected', response.data.data)
        commit('updateNote', response.data.data)
    })
}