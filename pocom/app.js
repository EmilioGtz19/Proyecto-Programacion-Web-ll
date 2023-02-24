const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001

app.get("/api",(request,response)=>{
    response.json({message: "Hola desde el servidor"})
})

app.listen(PORT, ()=> {
    console.log(`Server listening on ${PORT}`)
})