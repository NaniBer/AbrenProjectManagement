const mongoose = require('mongoose')
const ResourceConsumptionSchema = mongoose.Schema({
    Resource: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource',
        required: true
    },
    ConsumeDate: {
        type: Date,
        Required: true
    },
    ConsumedBy: {
        type: String,
        required: true
    },
    AuthorizedBy: {
        type: String, 
        required: true
    },
    Task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tasks',
        required: true
    }


})
const ResourceConsumption = mongoose.model('ResourceConsumption', ResourceConsumptionSchema );
module.exports= ResourceConsumption;