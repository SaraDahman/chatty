const mongoose = require('mongoose');
const app = require('./app');
const port = app.get('port');

const uri = process.env.ATLAS_URI;

app.listen((port, (req, res) => {
    console.log(`app is running on port ${port}`);
}))


mongoose.connect(uri).then(() => {
    console.log('mongoDB connected successfully');
}).catch((err) => {
    console.log(`mongoBD failed to connect, error: ${err.message}`);
})


