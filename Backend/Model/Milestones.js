const mongoose = require ('mongoose')

const MilestonesSchema = mongoose.Schema({
    ProjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects',
        required: true

    },
    MilestoneName: {
        type: String,
        required : true

    }, 
    Deadline: {
        type: Date,
        required: true
    },
    Description: {
        type: String,
        
    }

})
const Milestones = mongoose.model('Milestones', MilestonesSchema)
module.exports= Milestones;