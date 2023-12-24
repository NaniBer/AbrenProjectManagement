const mongoose = require ('mongoose');

const ResourceSchema = mongoose.Schema({
    project: {

        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    ResourceName : {
        type: String,
        required : true
    },
    Category: {
        enum: ['Material', 'Work', 'Cost'],
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
     Cost: {
         enum: ['per Hour', 'per Person'],
         required: true
     },
    TotalCost : {
        type: Number, 
        required: true
    }
   
})