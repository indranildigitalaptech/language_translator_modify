const connection = require('../config/db.config.js');
const { validateModifiedData, validateFetchData } = require('../helpers/validateData.js');
const changeMultilingualJson = require('../helpers/changeMultilingual.js');
const modifyMultilingualData = require('../helpers/modifyMultilingual.js');

const fetchMultilingualData = async (id, tableName, identifierColumn, modifiableColumn) => {
    try {
        if (!id || !tableName || !identifierColumn || !modifiableColumn) {
            throw new Error('Invalid input: id, tableName, identifierColumn, and modifiableColumn must be provided');
        }

        const query = `SELECT ${modifiableColumn} FROM ${tableName} WHERE ${identifierColumn} = ?`;

        const results = await new Promise((resolve, reject) => {
            connection.query(query, [id], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });

        if (results.length === 0) {
            console.log('\nNo data found for the given ID');
            return null;
        }

        console.log(`\nMultilingual data of id ${id} fetched successfully:`, results[0][modifiableColumn]);
        return results[0][modifiableColumn];
    } catch (error) {
        console.error('\nError fetching multilingual data:', error);
        return null;
    }
};




const updateMultilingualData = async (
    arr,
    tableName,
    identifierColomn,
    modifiedColomn,
) => {
    // Validate input parameters
    if (!Array.isArray(arr) || arr.length === 0) {
        console.error("Invalid input: arr must be a non-empty array");
        return;
    }
    if (!tableName || !identifierColomn || !modifiedColomn) {
        console.error(
            "Invalid input: tableName, identifierColomn, and modifiedColomn must be provided"
        );
        return;
    }

    try {
        await Promise.all(
            arr.map(async (id) => {
                try {
                    const data = await fetchMultilingualData(
                        id,
                        tableName,
                        identifierColomn,
                        modifiedColomn
                    );
                    console.log(`Data for id ${id}:`, data);

                    const message = await validateFetchData(data);
                    console.log(`Validation message for id ${id}:`, message);

                    if (!message) {
                        console.warn(`No validation message for id ${id}. Skipping.`);
                        return;
                    }

                    if (message === "already_convertable") {
                        console.log(`Data for id ${id} is already convertable. No update needed.`);
                        return;
                    }

                    if (message !== "convertable") {
                        console.log(`Data for id ${id} is not convertable. Skipping.`);
                        return;
                    }

                    console.log(`Data for id ${id} is convertable. Processing...`);

                    let jsonData;
                    try {
                        jsonData = JSON.parse(data);
                    } catch (parseErr) {
                        console.error(`Failed to parse JSON for id ${id}. Skipping.`, parseErr);
                        return;
                    }

                    const updatedJsonData = await changeMultilingualJson(jsonData);
                    console.log(`Updated JSON for id ${id}:`, updatedJsonData);

                    const isValid = await validateModifiedData(updatedJsonData);
                    if (!isValid) {
                        console.error(`Modified JSON data for id ${id} is invalid. Skipping update.`);
                        return;
                    }

                    const updatedDataStr = JSON.stringify(updatedJsonData);
                    console.log(`Final data to update for id ${id}:`, updatedDataStr);

                    await modifyMultilingualData(
                        id,
                        tableName,
                        identifierColomn,
                        modifiedColomn,
                        updatedDataStr,
                        connection
                    );

                    console.log(`Successfully updated multilingual data for id ${id}`);
                } catch (innerError) {
                    console.error(`Error processing id ${id}:`, innerError);
                }

                console.log(`Finished processing id ${id}..........\n\n`);
            })
        );
    } catch (error) {
        console.error("Error updating multilingual data:", error);
    }
};


module.exports = updateMultilingualData;