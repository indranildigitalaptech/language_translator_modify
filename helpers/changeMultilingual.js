const axios = require('axios');

const translateText = async (text, sourceLang, targetLang) => {
  try {
    const response = await axios.get(
      'https://translate.googleapis.com/translate_a/single',
      {
        params: {
          client: 'gtx',
          sl: sourceLang,
          tl: targetLang,
          dt: 't',
          q: text,
        },
      }
    );

    return response.data[0][0][0]; // Extract translated text
  } catch (error) {
    console.error(`Translation error [${sourceLang} → ${targetLang}]:`, error.message);
    return null;
  }
};

const changeMultilingualJson = async (jsonData) => {
  const { en, es, fr } = jsonData;

  if (!en) {
    console.error('Cannot translate: "en" field is missing or empty.');
    return null;
  }

  const updatedJson = {
    en,
    fr: fr || await translateText(en, 'en', 'fr'),
    es: es || await translateText(en, 'en', 'es'),
  };

    //   console.log('Updated JSON:', updatedJson); // Log the updated JSON updatedJson;
  return updatedJson;
};

module.exports = changeMultilingualJson;
