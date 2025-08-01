# find es and fr blank or null
SELECT count(*) AS count
FROM playlist_tracks
WHERE (
(JSON_UNQUOTE(JSON_EXTRACT(genre, '$.es')) IS NULL OR JSON_UNQUOTE(JSON_EXTRACT(genre, '$.es')) = '')
AND (JSON_UNQUOTE(JSON_EXTRACT(genre, '$.fr')) IS NULL OR JSON_UNQUOTE(JSON_EXTRACT(genre, '$.fr')) = '')
);

# find en blank or null

SELECT count(*) AS count
FROM playlist_tracks
WHERE (
(JSON_UNQUOTE(JSON_EXTRACT(genre, '$.en')) IS NULL OR JSON_UNQUOTE(JSON_EXTRACT(genre, '$.en')) = '')
);

# find any field having null

SELECT id
FROM playlist_tracks
WHERE JSON_TYPE(JSON_EXTRACT(genre, '$.en')) = 'NULL'
   OR JSON_TYPE(JSON_EXTRACT(genre, '$.es')) = 'NULL'
OR JSON_TYPE(JSON_EXTRACT(genre, '$.fr')) = 'NULL'
ORDER BY id ASC;

