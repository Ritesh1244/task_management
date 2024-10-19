    const { required } = require('joi')
    const mongoose = require('mongoose')
    const Schema = mongoose.Schema

    const  TaskSchema = new Schema({
        title:{
            type:String,
            required:[true,"Please provide a title"],
        },
        description:{
            type:String,
            default:"No description"
        },
        dueDate:{
            type:Date,
            default:Date.now(),
        },
        status:{
            type:String,
            enum:["active","inactive"],
            default:"active",
        },
        completed:{
            type:Boolean,
            default:false,
        },
        priority:{
            type:String,
            enum:["low","medium","high"],
            default:"low",
        },
        user: {  // Add this field to associate a user with the task
            type: Schema.Types.ObjectId,
            ref: 'User',  // Assuming you have a User model defined
            required: true,
        }
    },{timestamps:true}
)

    const Taskmodel = new mongoose.model("task", TaskSchema)

    module.exports = Taskmodel