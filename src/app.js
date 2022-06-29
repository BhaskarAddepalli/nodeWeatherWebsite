// const express=require('express')
// //express is like a function called to create express application
// //console.log(__dirname)
// //console.log(__filename)
// // working with paths
// const path=require('path')
// //console.log(path.join(__dirname,'../public'))


// const app=express();
// //serving up the directory by using app.use()
// //app.set('views',path.join(__dirname,'../public/views'))
// app.set('view engine','hbs');
// app.use(express.static(path.join(__dirname,'../public')))  //customize ur server ,express.static is a function we are calling it and its value will be used by app.use()

// /*The app.use() function is used to mount the specified middleware function(s) at the path which is being specified. It is mostly used to set up middleware for your application.*/
// //app.com ,app.com/help -> run on one express server,while we setup on different routes

// app.get('',(req,res)=>{
//     app.render('index');   //render our views
// })


// // app.get('',(req,res)=>{
// //     //res.send('hello express ff!')  //->just display text on browser 
// // })
// // app.get('/help',(req,res)=>{
// //     res.send({
// //         name:'bhaskie',
// //         age:21
// //     })
// // })
// // app.get('/about',(req,res)=>{
// //     res.send('about page')
// // })
// // app.get('/weather',(req,res)=>{
// //     res.send('weather app page')
// // })

// // ch -47 template engines for rendering dynamic pages,we use handlebars
// //handlebars-> used for dynamic docs,easily create code which is reusable










// app.listen(3000,()=>{   //this callback runs when server is runnning
// console.log('server is running on port 3000')
// });


// const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast')
const app = express()
const port=process.env.PORT || 3000

const path=require('path')
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../public/views/fullviews')
const partialsPath = path.join(__dirname, '../public/views/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Bhaskie'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Bhaskie'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Bhaskie'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'you must provide address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
       if(error){
        return res.send({
            error
        })
       }
       forecast(latitude,longitude,(error,foreCastdata)=>{
        if(error){
            return res.send({
                error
            })
        }
        res.send({
            foreCast:foreCastdata,
             location,
             address:req.query.address
        })

       })

    })
    // res.send({
    //     forecast: 'It is raining',
    //     location: 'Amalapuram',
    //     address:req.query.address
    // })
})

app.get('*',(req,res)=>{
  res.render('404',{
    title:'404 page',
     name:'Bhaskie',
    errorMssg:'page Not found' })})
  

// app.listen(3000, () => {
//     console.log('Server is up on port 3000.')
// })

app.listen(port, () => {
    console.log('Server is up on port '+port+'.')
})