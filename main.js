const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
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

// app.get('/userdata', (req,res)=>{
//     res.send([
//         {
//             username:'Peter',
//             email:'peter@test.com'
//         },
//         {
//             username:'Bruce',
//             email:'wayne@test.com'
//         }
//     ]);
// })

app.post('/signup/post', (req,res)=>{
    // const username = req.username
    // const password = req.password

    // const data = {username,password}

    // datas.push(data)

    // res.status(201).json(data)
})

app.listen(port, ()=>{
    console.log('port ' + port)
});