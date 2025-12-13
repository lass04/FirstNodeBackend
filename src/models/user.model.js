import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            maxlength: 20,
            minlength: 4,
            trim: true
        },

        password:{
           type: String,
           required: true,
           maxlength: 20,
           minlength: 8,
        },

        email:{
          type:String,
          required: true,
          unique: true,
          lowercase: true,
          maxlength: 30,
          minlength: 13,
          trim: true
        },
    },
        {
            timestamps: true 
        }
        
)

export const User = mongoose.model("User",userSchema);