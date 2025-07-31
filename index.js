require('./config/db.config.js');

const updateMultilingualData = require('./utils/multilingual.js');


const arr = [
  7239, 7240, 7241, 7242, 7243, 7244, 7245, 7246, 7247, 7248,
  7249, 7250, 7251, 7252, 7253, 7254, 7255, 7256, 7257, 7258,
  7259, 7260, 7261, 7262, 7263
];
const tableName = "tracks";
const identifierColomn = "id";
const modifiedColomn = "instrument_tags";

// (arr,   tableName,  identifierColomn,    modifiedColomn )
(async()=>{
    await updateMultilingualData(arr, tableName, identifierColomn, modifiedColomn);
})();