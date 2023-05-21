import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_URL || ''

mongoose.connect(mongoUrl, {

})
    .then( db => console.log('DB is online'))
    .catch( err => console.log(err));
    