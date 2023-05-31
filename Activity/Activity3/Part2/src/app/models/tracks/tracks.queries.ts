export const trackQueries = {
    createTrack: `
        INSERT INTO tracks (albumId, title, number, video_url) VALUES (?, ?, ?, ?)
    `,
    readTracks: `
        SELECT title AS title, video_url AS video, number AS number, lyrics AS lyrics
        FROM music.tracks
        WHERE albumId = ?
    `,
    updateTrack: `
        UPDATE music.tracks
        SET title = ?, number = ?, video_url = ?, lyrics = ?
        WHERE id = ?
    `,
};