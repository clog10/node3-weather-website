const path = require('path')

const express = require('express')

const hbs = require('hbs')

const app = express()

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const publidDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publidDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Carlos Loaeza'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather About',
        name: 'Carlos Loaeza'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather Help',
        message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        name: 'Carlos Loaeza'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(longitude, latitude, (error, data) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: data,
                location,
                address: req.query.address
            })

        })
    })

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Oaxaca',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error Help',
        message: 'Help Article not found',
        name: 'Carlos Loaeza'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Carlos Loaeza'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port  3000')
})
