const mongoose = require('mongoose');
const server = require('./app');


const port = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;



server.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
});


mongoose.connect(uri).then(() => {
    console.log('mongoDB connected successfully');
}).catch((err) => {
    console.log(`mongoBD failed to connect, error: ${err.message}`);
})


