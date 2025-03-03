const mongoose = require('mongoose');
const app = require('./app');
const port = app.get('port');

const uri = process.env.ATLAS_URI;

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
});


mongoose.connect(uri).then(() => {
    console.log('mongoDB connected successfully');
}).catch((err) => {
    console.log(`mongoBD failed to connect, error: ${err.message}`);
})


