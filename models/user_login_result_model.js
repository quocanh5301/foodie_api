module.exports = class UserLoginResultModel {
    constructor(id, userName, userEmail, update_at, joinSince, user_image){
        this.id = id;
        this.userName = userName;
        this.userEmail = userEmail;
        this.update_at = update_at;
        this.joinSince = joinSince;
        this.user_image = user_image;
    }
}
//! not used yet