import { Post } from "../models/post.model.js";

const createPost = async (req,res) => {
    try{
    const { name, description, age } = req.body;

    if(!name || !description || !age){
        return res.status(400).json({message: "All fields are required"});
    }

    const findPost = await Post.findOne({name:name});
    if(findPost)
        return res.status(400).json({message: "Post already exists"});

    const post = await Post.create({
        name:name,
        description:description,
        age:age
    });

    res.status(201).json({
        message: "Post created successfully",
        post: {
            name: post.name,
            description: post.description,
            age: post.age
        }    
    });

  }catch(error){
    return res.status(500).json({
        message: "Internal Server Error",
        error: error.message
    })}

}

const getPosts = async (req,res) => {

    try{
        const getPosts = await Post.find();

        res.status(200).json(getPosts);

    }catch(error){
        
        return res.status(500).json({
            message: "Internal Server error ",
            error:error.message });
    }
}

const updatePost = async (req,res) => {

    try{
    
        if(Object.keys(req).length === 0) 
            return res.status(400).json({message: "No data provided"});
    
        const findPost = await Post.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!findPost)
            return res.status(400).json({message: "Post not found"});

        res.status(200).json({
            message:"Post updated successfully",
            findPost
        })
        

    }catch(error){
        return res.status(500).json({
            message:"Internal Server error",
            error:error.message
        })
    }
}

export {
    createPost,
    getPosts,
    updatePost
}