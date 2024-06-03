import mongoose from "mongoose";

// Define addressSchema 
const addressSchema = new mongoose.Schema({
    fullName:String,
    streetAddress:String,
    city:String,
    state:String,
    postalCode:String,
});

// Define and export Address model
const Address = mongoose.model("Address",addressSchema);
export default Address;