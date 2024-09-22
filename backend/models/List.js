import { Schema, model } from 'mongoose';
import Joi from 'joi';

const ListSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 200,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "UserSchema",
        required: true,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

ListSchema.virtual("tasks", {
    ref: "TaskSchema",
    foreignField: "listId",
    localField: "_id"
})

export const validateCreateList = function (obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(2).max(200).required(),
    })
    return schema.validate(obj)
}

export const validateUpdateList = function (obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(2).max(200),
    })
    return schema.validate(obj)
}

export default model('ListSchema', ListSchema)