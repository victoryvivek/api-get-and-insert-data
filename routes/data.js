const express = require('express');
const router = express.Router();
const DataModel=require('../models/data');
const UserModel = require('../models/user-model');

router.get('/get/data',(req,res,next)=>{
    DataModel.find({}).then(datamodels => {
        let datamodelArray = [];
        datamodels.forEach(datamodel => {
            datamodelArray.push({
                particular: datamodel.particular,
                previousYear: datamodel.previousYear,
                latestYear: datamodel.latestYear
            });
        });
        return res.send(datamodelArray);
    }).catch(err => {
        console.log("Error in datamodel :" + err)
    });
});

router.post('/set/data/:googleId',(req,res,next)=>{
    const googleId=req.params.googleId;
    console.log('googleid',googleId)
    let previousYear=req.body.previousYear;
    let latestYear=req.body.latestYear;
    let username;
    let userId;
    UserModel.findOne({
        googleId: googleId
    }).then(user=>{
        console.log(user);
        username=user.username;
        userId=user._id;
        const datamodel = new DataModel({
            userId: userId,
            particular:username,
            previousYear:previousYear,
            latestYear:latestYear
        });
        return datamodel.save();

    }).then(datamodel=>{
        DataModel.find({}).then(datamodels => {
            let datamodelArray=[];
            datamodels.forEach(datamodel => {
                datamodelArray.push({
                   particular:datamodel.particular,
                   previousYear:datamodel.previousYear,
                   latestYear:datamodel.latestYear
                });
            });
            return res.send(datamodelArray);
        }).catch(err => {
            console.log("Error in datamodel :" + err)
        });
    }).catch(err => {
        console.log("Error in Set Model :" + err)
    });
});

module.exports=router;