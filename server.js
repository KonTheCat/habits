const express = require('express')
const app = express()
port = 4006

app.get("/", (req, res) => {
    res.send('hello world')
})

app.listen(port, () => {
    console.log(`the server is running on port ${port}`)
})