const mongoose = require ('mongoose');

const ResourceSchema = mongoose.Schema({
    projectId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'projects',
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
     Frequency: {
        type: Number,
        required: true
     },
    TotalCost : {
        type: Number, 
        required: true
    }
   
})
const Resource = mongoose.model('Resource', ResourceSchema)
module.exports= Resource