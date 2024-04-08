import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    Rating:{
        type:Number,
        required:true
    },

    productname:{
        type: String,
        required: true
    },
    Review:{
        type: String,
        required: true
    },

})


export default mongoose.model("Review", userSchema);