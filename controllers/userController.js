import userModel from "../models/userModel.js";
import createError from "../utils/createError.js";

export const deleteUser = async (req, res, next) => {
    const user = await userModel.findById(req.params.id);

        if (req.userId !== user._id.toString()) {
            return next(createError(403, "You can delete only your account!"));
        }
       await userModel.findByIdAndDelete(req.params.id);
       res.status(200).send("Deleted.");
    
};

export const getUser = async (req, res, next) => {
    const user = await userModel.findById(req.params.id);
  
    res.status(200).send(user);
  };