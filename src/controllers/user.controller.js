import { User } from "../models/user.model.js";

const registerUser = async (req,res) => {
    
    try{
        const {username,password,email} = req.body;

        // Check all fields validity

        if(!username || !password || !email){
            return res.status(400).json({message: "All fields are required !"});
        }

        // Check if user already exists

        const exists = await User.findOne({email: email.toLowerCase()});
        if(exists){
            return res.status(400).json({message: "User already exists ! "});
        }

        const user = await User.create({
            username,
            password,
            email: email.toLowerCase(),
        })

        res.status(201).json({
            message:"User created",
            user:{id:user._id,username: user.username ,email: user.email}
        })
 

    }catch(error){
        return res.status(500).json({message: "Internal server error",error: error.message });
    }
}

const loginUser = async (req, res) => {
    
    try{
    const { email, password } = req.body;
    
    const user = await User.findOne({
        email:email.toLowerCase()
    });

    if(!user){
        return res.status(400).json({ message: "User Not found "});
    }

    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(400).json({
            message : "Invalid credentials"
        });
    }

    res.status(200).json({
        message: "Logged in succesfully ",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

     }catch(error){
        return res.status(500).json({message: "Server Inernal Error",error:error.message});
     }
}

export {
    registerUser,
    loginUser
}