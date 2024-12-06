import express from 'express'
import {
   getAllbarang,
   getbarangById,
   addbarang,
   updatebarang,
   deletebarang
} from '../controller/barang_controllers.js'

 import {authorize} from '../controller/auth_controllers.js'
import {admin} from '../middleware/role_validation.js'

const app = express()


app.get('/',authorize, getAllbarang)
app.get('/:id', authorize,getbarangById)
app.post('/',authorize, admin,  addbarang)
app.put('/:id', authorize, admin, updatebarang)
app.delete('/:id', authorize, admin, deletebarang)

export default app