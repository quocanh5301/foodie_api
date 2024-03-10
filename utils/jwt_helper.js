const jwt = require("jsonwebtoken");

//Generate an access token and a refresh token for this database user
exports.jwtTokens = ({ id, user_name, user_email, description, update_at, join_at, user_image, num_of_followers }) => {
    // const date = join_since.getTime();
    const user = {id, user_name, user_email, description, update_at, join_at, user_image, num_of_followers}; 
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '6h' });
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '15 days' });
    return ({ accessToken, refreshToken });
}
