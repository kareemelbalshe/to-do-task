import jwt from "jsonwebtoken";

export const verifyToken = function (req, res, next) {
    const authToken = req.headers.authorization
    if (authToken) {
        const token = authToken.split(" ")[1]
        try {
            const decodedPayload = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decodedPayload
            next()
        }
        catch (error) {
            return res.status(401).json({ message: "invalid token, access denied" })
        }
    }
    else {
        return res.status(401).json({ message: "no token provider, access denied" })
    }
}

export const verifyTokenAndOnlyUser = function (req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.id = req.params.id) {
            next()
        }
        else {
            return res.status(403).json({ message: "not allowed, only user himself" })
        }
    })
}