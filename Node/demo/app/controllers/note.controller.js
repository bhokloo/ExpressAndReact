
const Note = require('../models/note.model');

exports.create = (req, res) => {
    console.log("!");
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Note
    const note = new Note({
        title: req.body.title || "NUS", 
        name: req.body.name
    });

    // Save Note in the database
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

exports.findAll = (req,res) => {
    console.log("!");
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message : err.message || "Error occured retrievng data"
        })
    })
};

exports.findOne = (req,res) => {
    console.log(req.params.noteId);
    Note.findById(req.params.noteId)
    .then(notes => {
        console.log("came");
        if(!notes) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });            
        }
        res.send(notes);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};

exports.update = (req,res) => {
    console.log("hitted");
    if(!req.body.content)
    {
        return res.status(400).send({
        "message" : "Note please provide content"
        });
    }

    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "default title",
        content: req.body.content
    }, {new : true})
    .then(note => {
        if(!note)
        {
            return res.status(400).send({
                message: "note not found with id :" + req.params.noteId
            })
        }
        res.status(200).send(note);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });   
};


exports.delete = (req,res) =>
{
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => 
        {
            if(!note)
            {
                res.status(400).send(
                    {
                        message: "nothing found with id :"+ req.params.noteId 
                    });
            }
            res.send("deleted successfully");
        })
    .catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};
