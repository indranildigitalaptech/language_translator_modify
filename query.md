# find es and fr blank or null

SELECT count(\*) AS count
FROM tracks
WHERE (
(JSON_UNQUOTE(JSON_EXTRACT(composer_name, '$.es')) IS NULL OR JSON_UNQUOTE(JSON_EXTRACT(composer_name, '$.es')) = '')
AND (JSON_UNQUOTE(JSON_EXTRACT(composer_name, '$.fr')) IS NULL OR JSON_UNQUOTE(JSON_EXTRACT(composer_name, '$.fr')) = '')
);

# find en blank or null

SELECT count(\*) AS count
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

# migrate data

INSERT INTO legisrevamp_db_01_08_2025.playlist_tracks (id, playlist_id, track_id, title,composer, genre, duration,sort_order, description, created_at, updated_at)
SELECT
src.id,
src.playlist_id,
src.track_id,
JSON_OBJECT('en', src.title, 'es', '', 'fr', ''),
JSON_OBJECT('en', src.composer, 'es', '', 'fr', ''),
JSON_OBJECT('en', src.genre, 'es', '', 'fr', ''),
src.duration,
src.sort_order,
JSON_OBJECT('en', src.description, 'es', '', 'fr', ''),
src.created_at,
src.updated_at
FROM tunecutter_db.playlist_tracks AS src
LEFT JOIN legisrevamp_db_01_08_2025.playlist_tracks AS dest
ON src.id = dest.id
WHERE dest.id IS NULL;

# update the json
UPDATE legisrevamp_new1.playlist_tracks
SET
title = JSON_SET(title,
'$.es', IF(JSON_EXTRACT(title, '$.es') IS NULL, '', JSON_UNQUOTE(JSON_EXTRACT(title, '$.es'))),
        '$.fr', IF(JSON_EXTRACT(title, '$.fr') IS NULL, '', JSON_UNQUOTE(JSON_EXTRACT(title, '$.fr')))
),
composer = JSON_SET(composer,
'$.es', IF(JSON_EXTRACT(composer, '$.es') IS NULL, '', JSON_UNQUOTE(JSON_EXTRACT(composer, '$.es'))),
        '$.fr', IF(JSON_EXTRACT(composer, '$.fr') IS NULL, '', JSON_UNQUOTE(JSON_EXTRACT(composer, '$.fr')))
),
genre = JSON_SET(genre,
'$.es', IF(JSON_EXTRACT(genre, '$.es') IS NULL, '', JSON_UNQUOTE(JSON_EXTRACT(genre, '$.es'))),
        '$.fr', IF(JSON_EXTRACT(genre, '$.fr') IS NULL, '', JSON_UNQUOTE(JSON_EXTRACT(genre, '$.fr')))
),
description = JSON_SET(description,
'$.es', IF(JSON_EXTRACT(description, '$.es') IS NULL, '', JSON_UNQUOTE(JSON_EXTRACT(description, '$.es'))),
        '$.fr', IF(JSON_EXTRACT(description, '$.fr') IS NULL, '', JSON_UNQUOTE(JSON_EXTRACT(description, '$.fr')))
);

# find wrong json
SELECT id
FROM playlist_tracks
WHERE JSON_CONTAINS_PATH(title, 'one', '$.en')
  AND NOT JSON_CONTAINS_PATH(title, 'one', '$.es')
  AND NOT JSON_CONTAINS_PATH(title, 'one', '$.fr');