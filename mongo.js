const mongoose = require("mongoose");

const url = `mongodb://localhost:27017/noteApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
    content: "HTML is easy",
    important: true,
});

note.save().then((result) => {
    console.log("note saved!");
    mongoose.connection.close();
});

Note.find({}).then((result) => {
    result.forEach((note) => {
        console.log(note);
    });
    mongoose.connection.close();
});
