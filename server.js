// server.js

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'notes.json'); // Veri dosyamýz

app.use(cors());
app.use(express.json());

// Notlarý Oku (Sayfa yüklendiðinde çalýþýr)
app.get('/api/notes', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Veri okunamadý.' });
        }
        res.json(JSON.parse(data));
    });
});

// Yeni Not Kaydet (Form gönderildiðinde çalýþýr)
app.post('/api/notes', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        const notes = JSON.parse(data);
        const newNote = {
            id: Date.now(),
            title: req.body.title,
            content: req.body.content,
            date: new Date().toLocaleString()
        };
        notes.push(newNote);

        fs.writeFile(DATA_FILE, JSON.stringify(notes, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Not kaydedilemedi.' });
            }
            res.status(201).json(newNote);
        });
    });
});

// Not Sil
app.delete('/api/notes/:id', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        let notes = JSON.parse(data);
        const noteId = parseInt(req.params.id);

        const initialLength = notes.length;
        notes = notes.filter(note => note.id !== noteId);

        if (notes.length === initialLength) {
            return res.status(404).json({ error: 'Not bulunamadý.' });
        }

        fs.writeFile(DATA_FILE, JSON.stringify(notes, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Not silinemedi.' });
            }
            res.status(200).json({ message: 'Not baþarýyla silindi.' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server çalýþýyor: http://localhost:${PORT}`);
});