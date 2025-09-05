const express = require('express');
const { getChannelInfo, searchVideo, searchTrending, searchGenericVideos } = require('../controllers/youtube');
const router = express.Router();
const path = require('path');

// youtube channel data
router.get('/channel', async (req, res) => {

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Token missing!' });
        }
        
        const token = authHeader.split(' ')[1] // get the token
        const response = await getChannelInfo(token);

        res.json(response.data)

    } catch (err) {
        console.log(err);
    }

})

router.get('/searchVideo/:query', async (req, res) => {

    try {
        const { query } = req.params;
        const response = await searchVideo(query);

        res.json(response.data)

    } catch (err) {
        console.log(err);
    }
})

router.get('/searchVideo/', async (req, res) => {
    try {
        const response = await searchGenericVideos();
        return res.json({
            'status': 200,
            'data': response
        });
        
    } catch (err) {
        console.log(err);
    }
})

router.get('/trending', async (req, res) => {
    try {
        const response = await searchTrending();
        res.json(response.data)
    } catch (err) {
        console.log(err);
    }
}) 

router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/templates/index.html'));
});



router.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/templates/test.html'));
});


module.exports = router;
