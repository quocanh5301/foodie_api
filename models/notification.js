module.exports = class Notification {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.notification_content = data.notification_content;
        this.notification_image = data.notification_image;
        this.on_click_type = data.on_click_type;
        this.relevant_data = data.relevant_data;
        this.create_at = data.create_at;
    }
}