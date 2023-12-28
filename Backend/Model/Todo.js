const mongoose= require ('mongoose')
TodoSchema= mongoose.Schema({
    TodoName: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        required: false
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    TodoDescribtion: {
        type: String,
        required: false
    },
    Status: {
        type: String,
        required: true
    },
    Viewed: {
        type: Boolean,
        required: true
    }


})
const Todo = mongoose.model('Todo', TodoSchema);
module.exports= Todo
