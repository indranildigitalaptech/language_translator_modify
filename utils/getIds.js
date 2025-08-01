
const getIds = async(table,connection) => {
    if(!table) {
        throw new Error("Table name is required");
    }
    try {
        const query = `SELECT id FROM ${table}`;
        const results = await new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
        return results.map(result => result.id);
    } catch (error) {
        console.error("Error fetching IDs:", error);
        throw error;
    }

}

module.exports = getIds;