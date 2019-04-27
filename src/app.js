const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// Define paths for Express engine
const publicDirectory = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlevars engine and views location
app.set('view engine','hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req,res) =>{
    res.render('index',{
        title: 'Weather',
        name: 'TheOcelot'
    })
})


app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About Me',
        name: "TheOcelot"
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'here are some tips and tricks',
        name: 'TheOcelot '        
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address!!!'
        })
    }
    geocode(req.query.address, (error, {latitude,longtitude, place_name} = {}) => {
        if (error){
            return res.send({
             error   
            })
        }
        forecast(latitude,longtitude,  (error, forecastdata) => {
			if (error) {
				return res.send( error)
			}
			res.send({
                location: place_name,
                forecast: forecastdata,
                address: req.query.address    
            })			
		  })
    })
    
    
})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error:'YOu must provide a search term'
        })
    }
    res.send({
        products: []
    })
})


app.get('/help/*', (req,res) => {
    res.render('error',{
        title: 'ERROR',
        error_message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error',{
        title: 'ERROR',
        error_message: 'Page not found',
        name: 'TheOcelot'
    })
})


app.listen(port, ( ) => {
    console.log('Server is up on port ' + port)
})
