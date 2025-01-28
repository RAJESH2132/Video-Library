import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized. Login Again" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.USER_JWT_SECRET);
    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
    } else {
      return res.json({
        success: false,
        message: "Not Authorized, Login Again",
      });
    }
    next();
  } catch (error) {
    console.error(error); // Log error for debugging
    return res
      .status(500)
      .json({ success: false, message: "An unexpected error occurred" });
  }
};
export default userAuth;
