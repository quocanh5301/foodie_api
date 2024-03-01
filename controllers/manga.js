const db = require('../data/db'); 

async function getMangaList(req, res)  {
    const page = req.query.page;
    const offSet = req.query.offSet;
    const queryStr = "select * from manganime where is_manga = 'true' limit $1 offset $2"
    const rows = await db.query(queryStr, [offSet, offSet*page]);
    console.log(rows[0].title);
    res.send(JSON.stringify(rows));
}
 
async function getFavorite(req, res){
    
}

module.exports = {
    getManganimeList : getMangaList,
    getFavorite : getFavorite
}