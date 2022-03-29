import express from 'express';
import '../src/db/connection.js'
import router from '../src/routes/auth.js';
import post from '../src/routes/posts.js';
const index = express();
const port = process.env.PORT || 8000;

//route middleware
index.use(express.json())
index.use('/users', router)
index.use('/userr', post)
index.listen(port, function () {
    console.log(`connected to port ${port}`)
})