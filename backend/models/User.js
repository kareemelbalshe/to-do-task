import { Schema, model } from 'mongoose';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import passwordComplexity from 'joi-password-complexity';

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

UserSchema.virtual("lists", {
    ref: "listSchema",
    foreignField: "user",
    localField: "_id"
})

UserSchema.methods.generateAuthToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET)
}

export const validateRegisterUser = function (obj) {
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(100).required(),
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: passwordComplexity().required()
    })
    return schema.validate(obj)
}

export const validateLoginUser = function (obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: Joi.string().trim().min(8).required(),
    })
    return schema.validate(obj)
}

export default model('UserSchema', UserSchema)