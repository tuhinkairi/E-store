import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const tokenGenerate=( {email, password} )=> {
  try {
    const token = jwt.sign(
      { email: email, password: password },
      process.env.JWT_KEY,
      {
        expiresIn: "7d",
      }
    );
    if (token) {
      return token;
    }
    throw new Error("Failed to generate token");
  } catch (error) {
    console.log(error)
    return error;
  }
}


export default tokenGenerate;