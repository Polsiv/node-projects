const { google } = require('googleapis');
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

async function getChannelInfo(token) {
    
    oauth2Client.setCredentials({access_token: token});

    try {
        const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
        const response = await youtube.channels.list({
            part: 'snippet,statistics',
            mine: true,
        });
        
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Failed to search for channel');
    }
}

async function searchVideo(query) {
    try {
        const youtube = google.youtube({version: 'v3', auth: process.env.API_KEY});

        const response = await youtube.search.list({
            part: 'snippet',
            q: query,
            type: 'video',
            maxResults: 5 
        });        
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Failed to search for video');
    }
}

async function searchTrending() {
    try {
        const youtube = google.youtube({ version: 'v3', auth: process.env.API_KEY });
        const response = await youtube.videos.list({
            part: 'snippet,statistics',
            chart: 'mostPopular',
            regionCode: 'CO',
            maxResults: 5
        });

        return response.data;

    } catch (error) {
        throw new Error(error.message || 'Failed to search for video');
    }
}

async function searchGenericVideos(){
    try {
        const youtube = google.youtube({version: 'v3', auth: process.env.API_KEY});

        const response = await youtube.search.list({
            part: 'snippet',
            type: 'video',
            maxResults: 10
        })

        return response.data;

    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { getChannelInfo, searchVideo, searchTrending, searchGenericVideos }


 