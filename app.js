const express = require('express')
const routers = require('./routes')
const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: false}))
app.use(routers)



app.listen(3000, () => {
    console.log(`apps listening on port 3000`)
})