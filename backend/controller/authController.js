import bcrypt from 'bcryptjs'
import UserSchema, { validateRegisterUser, validateLoginUser } from "../models/User.js"

export const registerUserCtrl = async (req, res) => {
    const { error } = validateRegisterUser(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    let user = await UserSchema.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).json({ message: "user already exist" })
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    user = new UserSchema({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword
    })
    await user.save()

    res.status(201).json({ message: "User created successfully" })
}

export const loginUserCtrl = async (req, res) => {
    const { error } = validateLoginUser(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    const user = await UserSchema.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).json({ message: "invalid email or password" })
    }
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordMatch) {
        return res.status(400).json({ message: "invalid email or password" })
    }
    const token = user.generateAuthToken()
    res.status(200).json({
        _id: user._id,
        token,
        username: user.username
    })
}
