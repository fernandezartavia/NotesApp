import { initializeEditPage, showLUtime } from './views'
import { updateNote, removeNote } from './notes'

const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const lastUpdatedElement = document.querySelector('#last-updated')
const removeElementButton = document.querySelector('#remove-note-button')
const noteId = location.hash.substring(1)

initializeEditPage(noteId)

titleElement.addEventListener('change', function (e) {
    const note = updateNote(noteId, {
        title: e.target.value
    })
    lastUpdatedElement.innerHTML = showLUtime(note.updatedAt)
})

bodyElement.addEventListener('change', function (e) {
    const note = updateNote(noteId, {
        body: e.target.value
    })
    lastUpdatedElement.innerHTML = showLUtime(note.updatedAt)
})

removeElementButton.addEventListener('click', function () {
    removeNote(noteId)
    returnToHomeScreen()
})

const returnToHomeScreen = () => {
    location.assign('/index.html')
}

window.addEventListener('storage', function (e) {
    if (e.key === 'notes') {
        initializeEditPage(noteId)
    }
})