  
'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const server = express();
server.use(cors());
server.use(express.json());
mongoose.connect('mongodb://localhost:27017/Book', { useNewUrlParser: true, useUnifiedTopology: true });


// const bookSchema = require('./model');
// const bookModel = require('./model');



// =======================ROUTES

server.get('/test', testHandler);
server.get('/books', getBooksHandler);
server.post('/addbook',addbookHandler);
server.delete('/deletebook/:id',deleteBookHandler);




//Schema
const bookSchema = new mongoose.Schema({
    title: String,
    description:String,
    status:String,
    email:String
});

//Model
const bookModel = mongoose.model('Books', bookSchema);


function seedDataCollection() {
    const Book1 = new bookModel({
        title:'The Siege',
        description:'The Levin family battle against starvation in this novel set during the German siege of Leningrad. Anna digs tank traps and dodges patrols as she scavenges for wood, but the hand of history is hard to escape.',
        status:'Historical Fiction',
        email:'ahmadqouraan@gmail.com'
    })

    const Book2 = new bookModel({
        title:'A Little Life',
        description:'This operatically harrowing American gay melodrama became an unlikely bestseller, and one of the most divisive novels of the century so far. One man’s life is blighted by abuse and its aftermath, but also illuminated by love and friendship. Some readers wept all night, some condemned it as titillating and exploitative, but no one could deny its power.',
        status:' Domestic Fiction',
        email:'ahmadqouraan@gmail.com'
    })


    const Book3 = new bookModel({
        title:'Darkmans',
        description:'British fiction’s most anarchic author is as prolific as she is playful, but this freewheeling, visionary epic set around the Thames Gateway is her magnum opus. Barker brings her customary linguistic invention and wild humour to a tale about history’s hold on the present, as contemporary Ashford is haunted by the spirit of a medieval jester.',
        status:'Novel, Fiction',
        email:'ahmadqouraan@gmail.com'
    })


    const Book4 = new bookModel({
        title:'Dark',
        description:'British fiction’s most anarchic author is as prolific as she is playful, but this freewheeling, visionary epic set around the Thames Gateway is her magnum opus. Barker brings her customary linguistic invention and wild humour to a tale about history’s hold on the present, as contemporary Ashford is haunted by the spirit of a medieval jester.',
        status:'Novel, Fiction',
        email:'ahmadqouraan@gmail.com'
    })

    Book1.save();
    Book2.save();
    Book3.save();
    Book4.save();

}
// seedDataCollection();



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


async function addbookHandler(request,response) {

let {email, title , description } = request.body;

    await bookModel.create({email, title ,description});

    bookModel.find({email,title,description},function(err,ownerData){

    if(err){
        console.log('Error in getting data')
    }else {
        
        console.log(ownerData);
        response.send(ownerData);
    }

})


}


 function deleteBookHandler(request,response) {

    let email = request.query.email;
    let bookID = request.params.id;

    bookModel.remove({ _id: bookID }, (error, bookData) => {
        if (error) {
          response.send("error in deleting the data");
        } else {
            console.log("data deleted", bookData);

          bookModel.find({ email: email }, function (err, ownerData) {
            if (err) {
              console.log("error in getting the data");
            } else {
              response.send(ownerData);
            }
          });
        }
      });
    }








function testHandler(req, res) {
    res.send('all good')
}

server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
})




// async function addbookHandler(request,response) {

//     let {email, title , description } = request.body;
    
//         await bookModel.create({email,title,description},function(err,ownerData){
    
//         if(err){
//             console.log('Error in getting data')
//         }else {
//             ownerData.push({
//                 title,
//                 description,
//               });
//             console.log(ownerData);
//             response.send(ownerData)
//         }
    
//     })
    
//     }