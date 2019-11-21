const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const Schema=mongoose.Schema;
const dataSchema=new Schema({
    
});

dataSchema.plugin(mongooseUniqueValidator);

mongoose.exports=mongoose.model('DataModel',dataSchema);