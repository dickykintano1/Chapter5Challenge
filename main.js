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
    res.render('login');;
})

app.post('/login/auth', (req,res) =>{
    const username = req.body.username
    const password = req.body.password
    if (username == null){
        return res.status(400).send('User not Registered')
    } else if (!password){
        return res.status(400).send('Password Required')
    }
    try {
        if((authenticationData(username, password)) === 'valid'){
            const data = datas.find(i => i.username === username);
            res.redirect(`/user/${data.id}`)
        } else {
            res.send('Incorrect Username and/or Password')
        }
    } catch {
        res.status(500).send()
    }
})

app.get('/signup', (req,res)=>{
    res.render('signup');
})

app.post('/signup', (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const id = Number(datas[datas.length - 1].id) + 1;
    const registeredUser = datas.find(i => i.username == username);
    if(!username || !password){
        return res.status(400).send('Username and Password required');
    } else if (registeredUser !== undefined) {
        res.send('Username taken!')
    } else {
        const userData = {
            'id': id.toString(),
            'username': username,
            'password': password
        };
        datas.push(userData);
        res.render('login');
    }
})

app.get('/user/:id', (req,res) =>{
    //show user infos
    const data = datas.find(i => i.id === req.params.id);
    res.send(`welcome, ${data.username}`);
})

app.listen(port, ()=>{
    console.log('port ' + port)
});

function authenticationData(username, password){
    //match up user input data with json data
    let userIndex = datas.findIndex(function(item){
        return item.username === username
    });
    // console.log(datas[userIndex])
    console.log(userIndex)
    if(userIndex === -1){
        return 'invalid';
    } else {
        if (datas[userIndex].password === password){
            return 'valid';
        }
    }
}