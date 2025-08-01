const getTableData = (arr, tableName, identifierColumn, connection) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(arr) || arr.length === 0) {
      return reject(new Error("Input array must be a non-empty array"));
    }
    if (!tableName) {
      return reject(new Error("Table name is required"));
    }
    if (!identifierColumn) {
      return reject(new Error("Identifier column is required"));
    }
    if (!connection) {
      return reject(new Error("Database connection is required"));
    }

    const placeholders = arr.map(() => '?').join(', ');
    const query = `SELECT * FROM \`${tableName}\` WHERE \`${identifierColumn}\` IN (${placeholders})`;

    connection.query(query, arr, (error, results) => {
      if (error) {
        console.error("Error fetching table data:", error);
        return reject(error);
      }
      resolve(results);
    });
  });
};

module.exports = getTableData;
