const ContentModel = require("../models/Content")
const CommentModel = require("../models/Comment")
const UserModel = require("../models/User")

// GET - all content from all users
const getAllContents = async (req, res) => {
    try {
        const allContents = await ContentModel.find()
        res.json(allContents)
    } catch (error) {
        console.log(error.message)
        res.json({status: "error", msg: "failed to retrieve content data."})
    }
}

// POST - get 1 content by contentId parma
const getOneContentByContentID = async (req, res) => {
    try {
        const uniqueContent = await ContentModel.findById(req.params.contentId);
        res.json(uniqueContent)
    } catch (error) {
        console.log(error.message)
        res.json({status: "error", msg: "failed to retrieve content."})
    }
}

// PATCH - add a like count to content through contentId param
const addToLikeCount = async (req, res) => {
    try {
        const addLikeCount = await ContentModel.findByIdAndUpdate(req.params.contentId)
    } catch (error) {
        
    }
}