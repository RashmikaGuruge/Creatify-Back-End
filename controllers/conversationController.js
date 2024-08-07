import createError from "../utils/createError.js";
import conversationModel from '../models/conversationModel.js'

export const createConversation = async (req, res, next) => {
    const newConversation = new conversationModel({
        id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
        sellerId: req.isSeller ? req.userId : req.body.to,
        buyerId: req.isSeller ? req.body.to : req.userId,
        readBySeller: req.isSeller,
        readByBuyer: !req.isSeller
    });

    try {
        const savedConversation = await newConversation.save();
        res.status(200).send(savedConversation);
    } catch (err) {
        next(err);
    }
}

export const updateConversation = async (req, res, next) => {
    try {
        const updatedConversation = await conversationModel.findOneAndUpdate(
            {id: req.params.id},
            {
                $set: {
                    // readByBuyer: !req.isSeller,
                    // readBySeller: req.isSeller
                    ...(req.isSeller ? {readBySeller: true} : {readByBuyer: true}),
                }
            },
            { new: true}
        );
        res.status(200).send(updatedConversation);
        
    } catch (err) {
        next(err);
    }

}

export const getConversations = async (req, res, next) => {
    
    try {
       const conversations = await conversationModel.find(req.isSeller ? {sellerId: req.userId} : {buyerId: req.userId}).sort({ updatedAt: -1 });
       res.status(200).send(conversations);
    } catch (err) {
        next(err);
    }
}

export const getSingleConversation = async (req, res, next) => {
    
    try {
        const conversation = await conversationModel.findOne({ id: req.params.id });
        if (!conversation) return next(createError(404, "Not found!"));
        res.status(200).send(conversation); 
    } catch (err) {
        next(err);
    }
}