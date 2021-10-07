/**servidor basico */
const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');


const app = express();
mongoose.connect('mongodb://localhost/udenar')
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

//settings
app.set('port', process.env.PORT || 3000)

//Middlewares
app.use(morgan('dev'));
app.use(express.json()); //entiende toda la info que se envia desde el navegador en formato json -> rest api

//routes

app.use('/api/tasks', require('./routes/task'));

//Static files
app.use(express.static(__dirname + '/public'));

//server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});