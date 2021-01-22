require('dotenv').config()
const app = require('./src/config/custom-express')

console.log(process.env.PORT)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Working on ${port}`))