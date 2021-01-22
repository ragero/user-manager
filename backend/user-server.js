require('dotenv').config()
const app = require('./src/config/custom-express')

port = 3000

app.listen(port, () => console.log(`Working on ${port}`))