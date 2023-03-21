const express = require('express');
const userRoutes = require('./routes/user_routes');
var cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cors());
app.use('/api', userRoutes);


app.listen(PORT, ()=> {
    console.log(`Server listening on ${PORT}`)
})

