import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

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

// Hash the password with bcrypt if password not modified

userSchema.pre("save", async function(next){
    if(!this.isModified(this.password))
        return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})

// Compare passwords with bcrypt

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password,this.password);
}

export const User = mongoose.model("User",userSchema);