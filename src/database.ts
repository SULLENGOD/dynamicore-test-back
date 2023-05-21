import mongoose from "mongoose";

mongoose.connect('mongodb://localhost/test', {

})
    .then( db => console.log('DB is online'))
    .catch( err => console.log(err));
    