const express = require('express')
const dbConnect = require('./dbConnect')
const app = express()
app.use(express.json())
const userRoute = require('./routes/usersRoute')
const employeeRoute = require('./routes/employeesRoute')
const permiRoute = require('./routes/permisRoute')
const etablissementRoute = require('./routes/etablissementsRoute')

app.use('/api/users/', userRoute)
app.use('/api/employees/', employeeRoute)
app.use('/api/permis/', permiRoute)
app.use('/api/etablissements/', etablissementRoute)
const port = 5000
app.get('/', (req, res) => res.send('Hello'))
app.listen(port, () => console.log(`app listening on port ${port}`))