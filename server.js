  
'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const PORT = process.env.PORT;
const server = express();
server.use(cors());


mongoose.connect('mongodb://localhost:27017/Book', { useNewUrlParser: true, useUnifiedTopology: true });


//Schema
const bookSchema = new mongoose.Schema({
    title: String,
    description:String,
    status:String,
    email:String
});

//Model
const bookModel = mongoose.model('Books', bookSchema);

let array = [];

function seedDataCollection() {
    const Book1 = new bookModel({
        title:'The Siege',
        description:'The Levin family battle against starvation in this novel set during the German siege of Leningrad. Anna digs tank traps and dodges patrols as she scavenges for wood, but the hand of history is hard to escape.',
        status:'Historical Fiction',
        email:'AhmadQouraan@gmail.com'
    })
    array.push(Book1);

    const Book2 = new bookModel({
        title:'A Little Life',
        description:'This operatically harrowing American gay melodrama became an unlikely bestseller, and one of the most divisive novels of the century so far. One man’s life is blighted by abuse and its aftermath, but also illuminated by love and friendship. Some readers wept all night, some condemned it as titillating and exploitative, but no one could deny its power.',
        status:' Domestic Fiction',
        email:'AhmadQouraan@gmail.com'
    })

    array.push(Book2);

    const Book3 = new bookModel({
        title:'Darkmans',
        description:'British fiction’s most anarchic author is as prolific as she is playful, but this freewheeling, visionary epic set around the Thames Gateway is her magnum opus. Barker brings her customary linguistic invention and wild humour to a tale about history’s hold on the present, as contemporary Ashford is haunted by the spirit of a medieval jester.',
        status:'Novel, Fiction',
        email:'AhmadQouraan@gmail.com'
    })

    array.push(Book3);


    Book1.save();
    Book2.save();
    Book3.save();
}
seedDataCollection();

console.log(array);



// =======================ROUTES

server.get('/test', testHandler);
server.get('/books', getBooksHandler);




function getBooksHandler(request,response) {

let arrayNew = array.map((item)=>{

return (item);

});
response.send(arrayNew);
}




function testHandler(req, res) {
    res.send('all good')
}

server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
})