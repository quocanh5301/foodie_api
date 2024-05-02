// function currentDateDMY() {
//     let today = new Date();

//     let dd = today.getDate();
//     let mm = today.getMonth() + 1;

//     let yyyy = today.getFullYear();

//     if (dd < 10) {
//         dd = '0' + dd;
//     }
//     if (mm < 10) {
//         mm = '0' + mm;
//     }
//     today = yyyy + '/' + mm + '/' + dd;

//     return today;
// }

//! reassigning let won't work dumbass 3rd year me :D
function currentDateDMY_HM() {
    let today = new Date();

    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    let hh = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (hh < 10) {
        hh = '0' + hh;
    }
    if (min < 10) {
        min = '0' + min;
    }
    if (sec < 10) {
        sec = '0' + sec;
    }
    todayDate = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min + ':' + sec;

    return todayDate;
}

module.exports = {
    // currentDateDMY : currentDateDMY, 
    currentDateDMY_HM : currentDateDMY_HM,
    //!qa
}