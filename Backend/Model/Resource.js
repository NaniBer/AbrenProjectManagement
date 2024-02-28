const mongoose = require ('mongoose');

const ResourceSchema = mongoose.Schema({
    projectId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'projects',
       // required: true,
    },
    ResourceName : {
        type: String,
        required : true
    },
    Category: {
        type: String,
        required: true,
        enum: ['Material', 'Work', 'Cost']
    },
    Quantity: {
        type: Number,
        required: true
    },
     CostCategory: {
        type: String,
        required: true,
        enum: ['per Hour', 'per Person'],
        
     },
     Cost: {
        type: Number,
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