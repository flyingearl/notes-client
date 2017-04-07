export const setNotes = (state, data) => {
    state.all = data
}

export const addNote = (state, data) => {
    state.all.unshift(data)
}

export const setSelected = (state, data) => {
    state.selected = data
}

export const updateNote = (state, note) => {
    state.all.forEach((value, index) => {
        if (value.id === note.id) {
            state.all.slice(index, 1, note)
        }
    })
}