require('./config/db.config.js');
const legis_arr = require('./public/files/legis_tracks_arr.js');
const updateMultilingualData = require('./utils/multilingual.js');
const  getIds  = require('./utils/getIds.js');

const arr = legis_arr;
const tableName = "tracks";
const identifierColomn = "id";
const modifiedColomn = "composer_name";

// (arr,   tableName,  identifierColomn,    modifiedColomn )
(async()=>{
    const ids = await getIds(tableName);
    console.log("Fetched IDs:", ids);
    await updateMultilingualData(ids, tableName, identifierColomn, modifiedColomn);
})();
