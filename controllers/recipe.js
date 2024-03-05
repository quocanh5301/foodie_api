const db = require('../data/db'); 

async function getBookmarkList(req, res)  {
    console.log(req.user);
    // const page = req.query.page;
    // const pageSize = req.query.pageSize;
    // const queryStr = "select * from manganime where is_manga = 'true' limit $1 offset $2"
    // const rows = await db.query(queryStr, [pageSize, pageSize*page]);
    // console.log(rows[0].title);
    // res.send(JSON.stringify(rows));
}
 
async function getFavorite(req, res){
    
}

module.exports = {
    getBookmarkList : getBookmarkList,
    getFavorite : getFavorite
}