const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let datas = require('./db/user-data.json');

app.get('/', (req,res)=>{
    res.render('main');
    console.log('page /')
});

app.get('/game', (req,res)=>{
    res.render('game');
})

app.get('/login', (req,res)=>{
    res.render('login');
})

app.get('/signup', (req,res)=>{
    res.render('signup');
})

app.get('/userdata', (req,res)=>{
    res.send(datas);
})

app.post('/signup', (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    //put err handler here
    res.send(username);
    // addUserData(username, password, datas);
})


app.listen(port, ()=>{
    console.log('port ' + port)
});

function addUserData(username, password, db){
    let userData = {
        'username': username,
        'password': password
    }
    db.push(userData);
};