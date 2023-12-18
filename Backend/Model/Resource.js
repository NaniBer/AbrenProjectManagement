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
    // Cost: {
    //     enu ]

    // }
    TotalCost : {
        type: Number, 
        required: true
    }
})