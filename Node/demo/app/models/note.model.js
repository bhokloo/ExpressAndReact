const mongoose =  require('mongoose');

const NoteSchema = mongoose.Schema(
    {
        name: {
            required: true,
            trim: true,
            type: String,
            unique: true
          },
        title:{
            type: String
        }
        
    },{
        timestamps: true
    }
);

module.exports = mongoose.model('Notes', NoteSchema);