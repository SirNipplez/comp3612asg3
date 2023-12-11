const data = require('./dataProvider.js'); 
const paintings = data.paintingData;
const artists = data.artistData;
const galleries = data.galleryData;

const handlePaint = app => {
    app.get('/paintings', (req,resp) => { resp.json(paintings) } ); 
};

const handlePaintId = app => {app.get('/painting/:id', (req, resp) => {
    const paintingId = req.params.id;
    const match = paintings.find((painting) => painting.paintingID == paintingId);
    if (match)
    resp.json(match);
    else
    resp.json({"message": `no paintings found with id ${paintingId}`});
  });
};

const handlePaintArtist = app => {
    app.get('/painting/artist/:id', (req, resp) => {
        const artistId = req.params.id;
        const matches = paintings.filter(p => p.artist.artistID == artistId);
        if (matches.length > 0) 
        resp.json(matches); 
        else 
        resp.json({"message": `no paintings with artist id ${artistId}`}); 
    });
};

const handlePaintGallery = app => {
    app.get('/painting/gallery/:id', (req,resp) => {  
        const galleryId = req.params.id;
        const matches = paintings.filter(p => p.gallery.galleryID == galleryId);
        if (matches.length > 0) 
        resp.json(matches); 
        else 
        resp.json({"message": `no paintings with gallery id ${galleryId}`}); 
    });
};

const handlePaintYear = app => {
    app.get('/painting/year/:min/:max', (req, resp) => {
        const minYear = req.params.min;
        const maxYear = req.params.max;
        const matches = paintings.filter(p => p.yearOfWork >= minYear && p.yearOfWork <= maxYear);
        if (matches.length > 0) 
        resp.json(matches); 
        else 
        resp.json({"message": `no paintings found between ${minYear} and ${maxYear}`}); 
    });
};

const handlePaintText = app => {
    app.get('/painting/title/:text', (req, resp) => {
        const text = req.params.text.toUpperCase();
        const matches = paintings.filter(p => ((p.title).toUpperCase().includes(text)))
        if(matches.length > 0)
        resp.json(matches)
        else
        resp.json({"message": `no paintings found with title containing ${text}`}); 
    });
}


const handlePaintColor = app => {
    app.get('/painting/color/:name', (req, resp) => {
        const name = req.params.name.toUpperCase();
        const matches = paintings.filter((p) => {
            for (let c of p.details.annotation.dominantColors) {
                if (c.name.toUpperCase() == name) {
                    return true;
                }
            }
        });
        if (matches.length > 0) 
        resp.json(matches); 
        else 
        resp.json({"message": `no paintings found with dominant color ${name}`}); 
    });
}

const handleArtists = app => {
    app.get('/artists', (req,resp) => { resp.json(artists) } );
}

const handleArtistsCountry = app => {
    app.get('/artists/:country', (req, resp) => {
        const country = req.params.country;
        const matches = artists.filter(p => p.Nationality.toUpperCase() == country.toUpperCase());
        if (matches.length > 0) 
        resp.json(matches); 
        else 
        resp.json({"message": `no artist found with ${country}`}); 
    });
}

const handleGalleries = app => {
    app.get('/galleries', (req,resp) => { resp.json(galleries) } ); 
}

const handleGalleriesCountry = app => {
    app.get('/galleries/:country', (req, resp) => {
        const country = req.params.country;
        const matches = galleries.filter(p => p.GalleryCountry.toUpperCase() == country.toUpperCase());
        if (matches.length > 0) 
        resp.json(matches); 
        else 
        resp.json({"message": `no galleries in country ${country}`}); 
    });
}



module.exports = { 
    handlePaint, handlePaintId, handlePaintArtist, handlePaintGallery, handlePaintYear,
    handlePaintText, handlePaintColor, handleArtists, handleArtistsCountry, handleGalleries,
    handleGalleriesCountry
};