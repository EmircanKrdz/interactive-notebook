document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.getElementById('note-form');
    const noteTitleInput = document.getElementById('note-title');
    const noteContentInput = document.getElementById('note-content');
    const notesList = document.getElementById('notes-list');

    noteForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Sayfanýn yeniden yüklenmesini engelle

        const title = noteTitleInput.value;
        const content = noteContentInput.value;

        if (title && content) {
            addNoteToDOM(title, content);
            
            // Formu temizle
            noteTitleInput.value = '';
            noteContentInput.value = '';
        }
    });

    function addNoteToDOM(title, content) {
        // Yeni bir not öðesi oluþtur
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note-item';
        
        // Ýçeriði ekle
        noteDiv.innerHTML = `
            <h3>${title}</h3>
            <p>${content.replace(/\n/g, '<br>')}</p>
            <small>Eklenme Tarihi: ${new Date().toLocaleString()}</small>
        `;
        
        // Listeye en üste ekle (Yeni notlar yukarýda görünür)
        notesList.prepend(noteDiv);
    }
});