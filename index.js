const express = require ('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('tiny'));
app.use((req,res, next)=>{
    req.requestTime = Date.now();
    // req.method = 'GET';
    console.log(req.method, req.path);
    next();
})
app.use('/dogs', (req,res,next)=>{
    console.log("I LOVE DOGS!!")
    next();
})
const verifyPassword = (req,res,next)=>{
    const {password} = req.query;
    if(password === 'chickennugett'){
        next();
    }
    res.send('SORRY YOU NEED A PASSWORD');
    next();
}
// app.use((req,res,next)=>{
//     console.log("THIS IS MY FIRST MIDDLEWARE!!");
//    return next();
//     console.log("THIS IS MY FIRST MIDDLEWARE-- AFTER CALLING NEXT()")
// })
// app.use((req,res,next)=>{
//     console.log("THIS IS MY SECOND MIDDLEWARE!!");
//    return next();
// })
// app.use((req,res,next)=>{
//     console.log("THIS IS MY THIRD MIDDLEWARE!!");
//    return next();
// })
// app.use(morgan('dev'));
// app.use(morgan('tiny'));
// app.use(()=>{
//     console.log("HEYYY");
// })
app.use('/secret',verifyPassword, (req,res)=>{
    res.send('my biggest secret is: sometimes i smoke');
})
app.get('/', (req, res)=>{
    console.log(`REQUEST TIME IS: ${req.requestTime}`);
    res.send("HOME PAGE");
})
app.get('/dogs', (req, res)=>{
    console.log(`REQUEST TIME IS: ${req.requestTime}`);
    res.send("WOOF WOOF");
})
app.use((req,res)=>{
    res.status(404).send("NOT FOUND!!!");
})
app.listen(3000, ()=>{

    console.log("listening on the port 3000");
})