const mongoose = require('mongoose');

exports.connectdb = ()=>{
    mongoose.connect(`${process.env.URI}`).then(()=>{
        console.log("Connected to the database!");
    }).catch((error)=>{
        // console.log(error)
        console.log("Some error occured!");
    });
}