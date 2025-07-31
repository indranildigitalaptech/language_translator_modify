const modifyMultilingualData = async (id, tableName, identifierColumn, modifiableColumn, updatedData, connection) => {
    if (!id || !tableName || !identifierColumn || !modifiableColumn || !updatedData) {
        console.error('Invalid input: All parameters must be provided');
        return;
    }

    try {
        const jsonString = typeof updatedData === 'string'
            ? updatedData
            : JSON.stringify(updatedData);

        const query = `UPDATE \`${tableName}\` SET \`${modifiableColumn}\` = ? WHERE \`${identifierColumn}\` = ?`;

        await new Promise((resolve, reject) => {
            connection.query(query, [jsonString, id], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });

        console.log(`✅ Multilingual data of id ${id} updated successfully.`);
    } catch (error) {
        console.error(`❌ Error updating multilingual data of id ${id}:`, error.message);
    }
};

module.exports = modifyMultilingualData;
