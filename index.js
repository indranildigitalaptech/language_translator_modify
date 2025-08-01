require('./config/db.config.js');
const legis_arr = require('./public/files/legis_tracks_arr.js');
const updateMultilingualData = require('./utils/multilingual.js');
const getIds = require('./utils/getIds.js');
const connection = require('./config/db.config.js'); //Legis db
const connection2 = require('./config/db2.config.js'); // tunecutter
const compareIds = require('./helpers/compareIds.js');
const getTableData = require('./helpers/getTableData.js');
const insertPalylistTracks = require('./helpers/insertPlaylist_tracks.js');

const arr = legis_arr;
const tableName = "playlist_tracks";
const identifierColomn = "id";
const modifiedColomn = "genre";


(async()=>{
    const ids = await getIds(tableName,connection);
    console.log("Fetched IDs:", ids);
    await updateMultilingualData(ids, tableName, identifierColomn, modifiedColomn);
})();

// (async () => {
//     const id1 = await getIds(tableName, connection);
//     const id2 = await getIds(tableName, connection2);
//     const result = await compareIds(id1, id2);
//     console.log("Comparison Result:", result);
// })();

// (async () => {
//     const result = await getTableData(arr, tableName, identifierColomn, connection2);
//     console.log("Fetched Table Data:", result);
//     await insertPalylistTracks(result, connection);
//     console.log("Playlist tracks inserted successfully.");
// })();
// console.log("arr length:", arr.length);