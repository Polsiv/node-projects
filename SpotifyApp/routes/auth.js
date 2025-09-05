const express = require('express');
const { google } = require('googleapis');
const fs = require('fs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const oauth2Client = new google.auth.OAuth2(CLIENT_ID,  CLIENT_SECRET, REDIRECT_URI);

// LOGIN
router.get('/login', (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ["https://www.googleapis.com/auth/youtube",  
            "https://www.googleapis.com/auth/youtube.channel-memberships.creator",
            "https://www.googleapis.com/auth/youtube.readonly",
            "https://www.googleapis.com/auth/youtube.upload" ,
            "https://www.googleapis.com/auth/youtubepartner", 
            "https://www.googleapis.com/auth/youtubepartner-channel-audit"]
    });
    res.redirect(authUrl);
});

// Oauth2 callback
router.get('/callback', async (req, res) => {
    
    const { code } = req.query;
    
    if (!code) {
        return res.status(400).send('No code provided.');
    }
    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);


        // const jwtToken = jwt.sign({
        //     access_token: tokens.access_token, refresh_token: tokens.refresh_token },
        //     process.env.JWT_SECRET,
        //     { expiresIn: '1h'}
        // );

        // res.cookie('jwt', jwtToken, {httpOnly: true, secure: true});


        fs.writeFileSync('tokens.json', JSON.stringify(tokens));
        res.send('Authentication successful! You can close this window.');

    } catch (error) {
        res.status(500).send("Error");
    }
});



module.exports = router;