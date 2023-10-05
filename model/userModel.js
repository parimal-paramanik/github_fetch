
const mongoose= require("mongoose")

const userSchema= mongoose.Schema({
    id :{type:Number},
    name :{type:String},
    html_url :{type:String},
    description :{type:String},
    created_at :{type:Date},
    open_issues :{type:String},
    watchers :{type:Number},
    owner:{
        id :{type:Number},
        avatar_url :{type:String},
        html_url :{type:String},
        type :{type:String},
        site_admin :{type:Boolean},
    }
})


const userModel= mongoose.model("user",userSchema)

module.exports = {userModel}