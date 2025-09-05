const express = require('express');
const authRoutes = require('./routes/auth');
const youtubeRoutes = require('./routes/youtube');

const app = express();
const port = 3000;

app.use('/auth', authRoutes);
app.use('/youtube', youtubeRoutes);
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})