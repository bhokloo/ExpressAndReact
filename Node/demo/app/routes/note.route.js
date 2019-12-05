
module.exports = (app) => {
    const notes = require('../controllers/note.controller');
    app.post('/register', notes.create);
    app.get('/notes', notes.findAll);
    app.put('/notes/:noteId',notes.update);
    app.get('/notes/:noteId', notes.findOne);
    app.post('/hello', notes.create);
    app.delete('/notes/:noteId', notes.delete);
}
