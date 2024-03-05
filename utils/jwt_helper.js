const jwt = require("jsonwebtoken");

//Generate an access token and a refresh token for this database user
exports.jwtTokens = ({ id, userName, userEmail, update_at, joinSince, user_image }) => {
    // const date = join_since.getTime();
    const user = {id, userName, userEmail, update_at, joinSince, user_image}; 
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '15 days' });
    return ({ accessToken, refreshToken });
}
