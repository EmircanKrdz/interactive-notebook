document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.getElementById('note-form');
    const noteTitleInput = document.getElementById('note-title');
    const noteContentInput = document.getElementById('note-content');
    const notesList = document.getElementById('notes-list');

    const API_URL = 'http://localhost:3000/api/notes';

    // Sayfa yüklendiðinde notlarý çek
    fetchNotes();

    // Notlarý API'den çekme
    async function fetchNotes() {
        const response = await fetch(API_URL);
        const notes = await response.json();
        notesList.innerHTML = '';
        notes.reverse().forEach(note => addNoteToDOM(note));
    }

    // Yeni not kaydetme
    noteForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const title = noteTitleInput.value;
        const content = noteContentInput.value;

        if (title && content) {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, content })
            });

            if (response.ok) {
                fetchNotes();
                noteTitleInput.value = '';
                noteContentInput.value = '';
            } else {
                alert('Not kaydedilirken bir hata oluþtu.');
            }
        }
    });

    // Notu ekrana ekleme fonksiyonu (Silme butonunu da içerir)
    function addNoteToDOM(note) {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note-item';

        noteDiv.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content.replace(/\n/g, '<br>')}</p>
            <small>Eklenme Tarihi: ${note.date}</small>
            <button class="delete-btn" data-id="${note.id}">Sil</button>
        `;

        notesList.prepend(noteDiv);
    }

    // Not silme iþlevi
    notesList.addEventListener('click', async function (e) {
        if (e.target.classList.contains('delete-btn')) {
            const noteId = e.target.getAttribute('data-id');

            const response = await fetch(`${API_URL}/${noteId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                fetchNotes();
            } else {
                alert('Not silinirken bir hata oluþtu.');
            }
        }
    });
});