const express = require('express'); //no important statements since we are in the node and we import it via require
const http = require('http');
var path = require('path')
const PORT = process.env.PORT || 3000; //5000 is for local to try it out
const indexRouter = require('./router/index'); //since we created our router and router, we can require router
const userRouter = require('./router/users'); //since we created our router and router, we can require router
const baseController = require('./api/v1/controllers/baseController');
const webpush = require('web-push');



const publicVapidKey = 'BF1CB8MrBPBwoi_P9aSXPkvj_0DG89S6JhYLby9KfxC_g7Ki3wPinU52TCmnsYqImaOjLid-SR8UbM0yvYTt47I';
const privateVapidKey = 'RGiYU-BFebGcsOXNhME8PKKER4lav4jWWB-aKFGZBQ0'

webpush.setVapidDetails('mailto:jeel@moontechnolabs.com', publicVapidKey, privateVapidKey);

//subscribe route


const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Credentials', true);
        return res.status(200).json({});
    }
    next();
});



app.use(express.static(path.join(__dirname, 'test')));
const server = http.createServer(app);



const io = require('socket.io')(server);
require('./ioServer/index')(io);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static(__dirname + '/public/uploads'));

app.use('/', indexRouter);
app.use('/users', userRouter);
app.post('/subscribe', (req, res) => {
    console.log("req.body", req.body);
    //get push subscription object from the request
    const subscription = req.body;
    console.log("subscription", subscription);
    //send status 201 for the request
    res.status(201).json({})

    //create paylod: specified the detals of the push notification
    const payload = JSON.stringify({ title: 'Chat app' });
    console.log("paylod", payload);
    //pass the object into sendNotification fucntion and catch any error
    webpush.sendNotification(subscription, payload).catch(err => console.error(err));
})


server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));