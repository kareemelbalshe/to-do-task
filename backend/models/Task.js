import { Schema, model } from 'mongoose';
import Joi from 'joi';

const TaskSchema = new Schema({
    listId: {
        type: Schema.Types.ObjectId,
        ref: "ListSchema",
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "UserSchema",
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["in future", "in progress", "Done"],
        default: "in future",
    },
}, { timestamps: true })

export const validateCreateTask = function (obj) {
    const schema = Joi.object({
        listId: Joi.string().trim().required().label("ListId"),
        text: Joi.string().trim().required().label("Text"),
        status: Joi.string().trim().label("Status"),
    })
    return schema.validate(obj)
}

export const validateUpdateTask = function (obj) {
    const schema = Joi.object({
        text: Joi.string().trim(),
        status: Joi.string().trim(),
    })
    return schema.validate(obj)
}

export default model('TaskSchema', TaskSchema)