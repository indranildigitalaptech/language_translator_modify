const validateFetchData = async (dataStr) => {
  let jsonData;

  try {
    // Step 1: Parse string into JSON
    jsonData = JSON.parse(dataStr);
  } catch (error) {
    console.error("Invalid JSON string:", error.message);
    return false;
  }

  // Step 2: Check if the parsed object is valid and not empty
  if (
    !jsonData ||
    typeof jsonData !== 'object' ||
    Array.isArray(jsonData) ||
    Object.keys(jsonData).length !== 3
  ) {
    console.error('Invalid data: The fetched data is empty or not valid');
    return false;
  }

  // Step 3: Check for required keys
  const hasEn = 'en' in jsonData;
  const hasEs = 'es' in jsonData;
  const hasFr = 'fr' in jsonData;

  if (!hasEn || !hasEs || !hasFr) {
    console.error("Missing required keys: 'en', 'es', or 'fr'");
    return false;
  }

  // Step 4: Log and validate contents
  console.log(`✅ Valid JSON Received:
  typeof: ${typeof jsonData}
  length: ${Object.keys(jsonData).length}
  en: ${jsonData.en}
  es: ${jsonData.es}
  fr: ${jsonData.fr}`);

  if (!jsonData.en || jsonData.en.trim() === '') {
    return 'not_convertable';
  }

  if (jsonData.en && jsonData.es && jsonData.fr) {
    return 'already_converted';
  }

  return 'convertable';
};

const validateModifiedData = (data) =>{
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    console.error('Invalid data: The modified data is empty or not valid');
    return false;
  }

  const hasEn = 'en' in data;
  const hasEs = 'es' in data;
  const hasFr = 'fr' in data;

  if (!hasEn || !hasEs || !hasFr) {
    console.error("Missing required keys: 'en', 'es', or 'fr'");
    return false;
  }

  return true;
}

module.exports = {
  validateModifiedData,
  validateFetchData,
};
