import { getAccessToken } from "../repository/tokenCollection";

export const authMiddleware = async (req, res, next) => {
  try {
    console.log("access token checking");

    let accessToken = req.headers["access-token"] || "";

    if (accessToken == "" || accessToken == undefined) {
      throw new Error("access-token is missing from headers");
    }

    let currentAccessToken = await getAccessToken();
    console.log(currentAccessToken);

    if (accessToken != currentAccessToken) {
      throw new Error("Invalid access token, please generate again");
    }

    next();
  } catch (error) {
    res.status(401).json({
      data: null,
      success: false,
      message: error.message,
    });
  }
};
