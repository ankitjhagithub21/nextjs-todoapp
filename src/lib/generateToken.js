import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    const token = jwt.sign({id:userId},process.env.JWT_TOKEN,{expiresIn:"1d"})
    return token;
}

export default generateToken
