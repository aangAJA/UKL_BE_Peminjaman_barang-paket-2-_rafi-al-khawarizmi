import Express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import userRoute from './routes/user_route.js'
import authRoute from './routes/auth_route.js'
import barangRoute from './routes/barang_route.js'
import pinjamRoute from './routes/pinjam_route.js'

const app = Express()

dotenv.config()

app.use(Express.json())
app.use(Express.urlencoded({extended: true}))
app.use(cors())

app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/inventory', barangRoute)
app.use('/api/pinjam', pinjamRoute)
// app.use('/api/pengembalian', kembaliRoute)




app.use(bodyParser.json())

app.listen(process.env.APP_PORT, () => {
    console.log(process.env.APP_PORT)
})