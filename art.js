const express = require('express');
const app = express();

const path = require('path');
app.use('/static', express.static(path.join(__dirname, 'static')));
 
const handler = require('./scripts/handler.js')

handler.handlePaint(app);
handler.handlePaintId(app);
handler.handlePaintArtist(app);
handler.handlePaintGallery(app);
handler.handlePaintYear(app);
handler.handlePaintText(app);
handler.handlePaintColor(app);
handler.handleArtists(app);
handler.handleArtistsCountry(app);
handler.handleGalleries(app);
handler.handleGalleriesCountry(app);

let port = 5500;
app.listen(port, () => {
    console.log("server running at port = " + port);
})
