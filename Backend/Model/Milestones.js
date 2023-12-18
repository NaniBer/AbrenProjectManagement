const mongoose = require ('mongoose')

const MilestonesSchema = mongoose.Schema({
    MilestoneName: {
        type: String,
        required : true

    }, 
    Deadline: {
        type: Date,
        required: true
    },

})
const Milestones = schema.model('Milestones', MilestonesSchema)
module.exports= Milestones;