import createError from "../utils/createError.js";
import reviewModel from "../models/reviewModel.js";
import gigModel from "../models/gigModel.js";

export const createReview = async (req, res, next) => {
    if(req.isSeller) return next(createError(403, "Sellers can't create reviews!"));

    const review = new reviewModel({
        userId: req.userId,
        gigId: req.body.gigId,
        star: req.body.star,
        desc: req.body.desc
    })
    
    try {
        const createdReview = await reviewModel.findOne({
            userId: req.userId,
            gigId: req.body.userId
        });

        if(createdReview) return next(createError(403, "You are already added review!"));

        const saveReview = await review.save();

        await gigModel.findByIdAndUpdate(req.body.gigId, {
            $inc: { totalStars: req.body.star, starNumber: 1 },
        });
        res.status(201).send(saveReview);
    } catch (err) {
        next(err);
    }
}

export const deleteReview = async (req, res, next) => {
    try {
        
    } catch (err) {
        next(err);
    }
}

export const getReviews = async (req, res, next) => {
    try {
        const reviews = await reviewModel.find({gigId: req.params.gigId});
        res.status(200).send(reviews);
        
    } catch (err) {
        next(err);
    }
}