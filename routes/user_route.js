import express from 'express'
import {
   getAllUser,
   getUserById,
   addUser,
   updateUser,
   deleteUser
} from '../controller/user_controllers.js'

import {authorize} from '../controller/auth_controllers.js'
import {admin} from '../middleware/role_validation.js'

const app = express()


app.get('/', authorize,getAllUser)
app.get('/:id',authorize,  getUserById)
app.post('/', authorize, admin, addUser)
app.put('/:id', authorize, admin, updateUser)
app.delete('/:id', authorize, admin, deleteUser)

export default app