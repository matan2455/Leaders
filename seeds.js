var mongoose = require('mongoose');
var leaders = require('./models/leaders.js');
var comment = require('./models/comments.js')

var data = [
    {
        username: 'matan',
        password: 'dona1234',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        image: 'https://image.freepik.com/free-vector/superhero-pug-dog-illustration_41984-246.jpg',
        followers: 1250
    },
    {
        username: 'ofry',
        password: 'dona1234',
        description: 'hazila',
        image: 'https://image.freepik.com/free-photo/surprised-hispanic-schoolgirl-straightening-glasses_23-2148224778.jpg',
        followers: 12
    }
];

function seedDB() {
    leaders.deleteMany({}, (err)=> {
        if(err){
            console.log(err);
        }else{
            console.log("removed leaders");}
            //add a few leaders
            data.forEach((seed)=>{
                leaders.create(seed, (err,leader)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log('added  ' + leader.username);
                        //create a comment
                        comment.create(
                            {
                                text: 'this is ofry most honest form',
                                author: 'matan'
                            }, (err,comment)=> {
                                if(err){
                                    console.log(err);
                                }else {
                                    leader.comments.push(comment);
                                    leader.save();
                                }
                            })
                    }
            });
        });
    }); 
}



module.exports = seedDB;