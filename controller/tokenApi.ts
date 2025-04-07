import { generateNewAccessToken } from "../repository/tokenCollection";

const generateToken = async (req, res) => {
  try {
    let accessToken = await generateNewAccessToken();

    res.status(200).json({
      data: {
        accessToken: accessToken,
      },
      success: true,
      message: `New access token generated`,
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      success: false,
      message: error,
    });
  }
};

export { generateToken };
