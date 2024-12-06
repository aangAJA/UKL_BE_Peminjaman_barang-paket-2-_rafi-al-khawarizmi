import express from 'express'
import {
    getAllPeminjaman,
   getPeminjamanById,
   addPeminjaman,
   pengembalianBarang,
   usageReport,
   pinjamanalisis
} from '../controller/pinjam_controllers.js'

import {authorize} from '../controller/auth_controllers.js'
import {siswa, admin} from '../middleware/role_validation.js'

const app = express()


app.get('/', authorize, getAllPeminjaman)
app.get('/:id', authorize, getPeminjamanById)
app.post('/borrow', authorize, admin, addPeminjaman)
app.post('/return',authorize,admin, pengembalianBarang)
app.post('/usage-report', authorize,admin, usageReport)
app.post('/borrow-analysis', authorize,admin, pinjamanalisis)


export default app
// app.use(authenticate)

// app.use(admin)
// app.use(siswa)