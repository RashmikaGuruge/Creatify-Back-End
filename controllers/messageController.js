import createError from "../utils/createError.js";
import messageModel from '../models/messageModel.js';
import conversationModel from '../models/conversationModel.js';

export const createMessage = async (req, res, next) => {
    
        const newMessage = new messageModel({
            conversationId: req.body.conversationId,
            userId: req.userId,
            desc: req.body.desc,
          });
          try {
            const savedMessage = await newMessage.save();
            await conversationModel.findOneAndUpdate(
              { id: req.body.conversationId },
              {
                $set: {
                  readBySeller: req.isSeller,
                  readByBuyer: !req.isSeller,
                  lastMessage: req.body.desc,
                },
              },
              { new: true }
            );
        
            res.status(201).send(savedMessage);
        
    } catch (err) {
        next(err)
    }
}

export const getMessages = async (req, res, next) => {
    try {
        const messages = await messageModel.find({conversationId: req.params.id});
        res.status(200).send(messages);
    } catch (err) {
        next(err);
    }
}