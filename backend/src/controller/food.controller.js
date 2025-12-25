const foodModel = require("../models/food.model.js");
const { uploadFile }= require("../services/storage.service.js");
const {v4 : uuid} = require("uuid");
async function createFood(req, res){

    console.log(req.foodPartner);    
    console.log(req.file)
    const fileResult = await uploadFile(req.file.buffer, uuid());
    console.log(fileResult);


}

module.exports = {createFood};