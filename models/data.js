const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const Schema=mongoose.Schema;
const dataSchema=new Schema({
    userId:{
        type:String,
        required:true
    },
    particular: {
        type: String,
        required: true
    },
    previousYear: {
        type: String,
        required: true
    },
    latestYear: {
        type: String,
        required: true
    }
});

dataSchema.plugin(mongooseUniqueValidator);

module.exports=mongoose.model('DataModel',dataSchema);