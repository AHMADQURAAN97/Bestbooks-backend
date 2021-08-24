  
'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const server = express();
server.use(cors());

mongoose.connect('mongodb://localhost:27017/Book', { useNewUrlParser: true, useUnifiedTopology: true });


const bookSchema = require('./model');
const bookModel = require('./model');



// =======================ROUTES

server.get('/test', testHandler);
server.get('/books', getBooksHandler);



// localhost:3001/books?email=ahmadqouraan@gmail.com
function getBooksHandler(request,response) {

    let email = request.query.email;

    bookModel.find({email:email},function(err,ownerData){

        if(err){
            console.log('Error in getting data')
        }else {
            console.log(ownerData);
            response.send(ownerData)
        }

    })

}




function testHandler(req, res) {
    res.send('all good')
}

server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
})