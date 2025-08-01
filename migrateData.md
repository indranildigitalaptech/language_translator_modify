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
WHERE JSON_CONTAINS_PATH(composer, 'one', '$.en')
  AND NOT JSON_CONTAINS_PATH(composer, 'one', '$.es')
AND NOT JSON_CONTAINS_PATH(composer, 'one', '$.fr');
