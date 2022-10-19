require('dotenv').config()

const client = require('./server/connection.js')
const bodyParser = require('body-parser')
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 4201
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(PORT, () => console.log(`App has been started on localhost:${PORT}`))
client.connect()
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`)
})

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.param.room })
})

// app.get('/api/users', (req, res) => {
//     client.query('SELECT * FROM users', (err, result) => {
//         if (err) {
//             console.log(err.stack)
//         } else {
//             res.send(result.rows)
//         }
//     })
//     client.end
// })
