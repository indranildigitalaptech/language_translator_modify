# find es and fr blank or null
SELECT count(*) AS count
FROM tracks
WHERE (
    (JSON_UNQUOTE(JSON_EXTRACT(composer_name, '$.es')) IS NULL OR JSON_UNQUOTE(JSON_EXTRACT(composer_name, '$.es')) = '')
    AND (JSON_UNQUOTE(JSON_EXTRACT(composer_name, '$.fr')) IS NULL OR JSON_UNQUOTE(JSON_EXTRACT(composer_name, '$.fr')) = '')
);

# find en blank or null
SELECT count(*) AS count
FROM tracks
WHERE (
    (JSON_UNQUOTE(JSON_EXTRACT(composer_name, '$.en')) IS NULL OR JSON_UNQUOTE(JSON_EXTRACT(composer_name, '$.en')) = '')
);

# find any field having null
SELECT id
FROM tracks
WHERE JSON_TYPE(JSON_EXTRACT(composer_name, '$.en')) = 'NULL'
   OR JSON_TYPE(JSON_EXTRACT(composer_name, '$.es')) = 'NULL'
   OR JSON_TYPE(JSON_EXTRACT(composer_name, '$.fr')) = 'NULL'
ORDER BY id ASC;
