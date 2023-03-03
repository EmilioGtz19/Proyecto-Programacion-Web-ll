const express = require('express')
const loginRoutes = require('./routes/login_routes')
var cors = require('cors')

const app = express()

const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cors());
app.use('/login', loginRoutes);


app.listen(PORT, ()=> {
    console.log(`Server listening on ${PORT}`)
})

