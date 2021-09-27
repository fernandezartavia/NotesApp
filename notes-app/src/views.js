import moment from 'moment'
import { getFilters } from './filters'
import { getNotes, sortNotes } from './notes'

//function to show that last updated time in the edit page
let showLUtime = (ts) => {
    let LU = moment(ts)
    return `Last updated ${LU.fromNow()}`
}


//generate the DOM structure for a note
const generateNoteDom = (note) => {

    const newNote = document.createElement('a')
    const textEl = document.createElement('p')
    const status = document.createElement('p')

    //Setup the note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = '  Unnamed Note'
    }
    textEl.classList.add('list-item__title')
    newNote.appendChild(textEl)

    //Setup the link
    newNote.setAttribute('href', `/edit.html#${note.id}`)
    newNote.classList.add('list-item')

    //Setup the status message
    status.textContent = showLUtime(note.updatedAt)
    status.classList.add('list-item__subtitle')
    newNote.appendChild(status)

    return newNote
}

//render application notes
const renderNotes = () => {

    const notesEl = document.querySelector("#notes-div")
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy)

    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    notesEl.innerHTML = ""

    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const newNote = generateNoteDom(note)
            notesEl.appendChild(newNote)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }

}

const initializeEditPage = (noteId) => {

    const titleElement = document.querySelector('#note-title')
    const bodyElement = document.querySelector('#note-body')
    const lastUpdatedElement = document.querySelector('#last-updated')
    const notes = getNotes()
    const note = notes.find((note) => note.id === noteId)
    if (!note) {
        location.assign('/index.html')
    }

    titleElement.value = note.title
    bodyElement.value = note.body
    lastUpdatedElement.innerHTML = showLUtime(note.updatedAt)

}

export { generateNoteDom, renderNotes, showLUtime, initializeEditPage }