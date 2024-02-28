const mongoose = require('mongoose')
const ResourceConsumptionSchema = mongoose.Schema({
    ResourceId: {
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
    TasksId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tasks',
        required: true
    },
    BudgetConsumption: {
        type: Number,
        required: true
    }


})
const ResourceConsumption = mongoose.model('ResourceConsumption', ResourceConsumptionSchema );
module.exports= ResourceConsumption;