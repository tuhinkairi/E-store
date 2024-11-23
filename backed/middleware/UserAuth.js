import bcrypt from "bcrypt";

const hashPassword = async function(req, res, next) {
  if (!req.body.password) {
    return next(new Error("Password is required"));
  }
  try {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    next();
  } catch (err) {
    next(err);
  }
};

const comparePassword = async function(providedPassword, hashedPassword) {
  try {
    const isValid = await bcrypt.compare(providedPassword, hashedPassword);
    return isValid;
  } catch (err) {
    return err; // or throw err; depending on your error handling strategy
  }
};

export { hashPassword, comparePassword };