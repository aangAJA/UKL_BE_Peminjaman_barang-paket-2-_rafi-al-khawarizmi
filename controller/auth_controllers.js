import md5 from 'md5'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const secretKey = 'jura'

export const authenticate = async (req, res) => {
    const {username, password} = req.body
    try {
        const userCek = await prisma.user.findFirst({
            where:{
                username : username,
                password: password
            }
        })
        if(userCek){ //mengecek variabel memiliki nilai atau tidak
            const payload = JSON.stringify(userCek)  //mengubah userCek menjadi JSON
            const token = jwt.sign(payload, secretKey) //Membuat token JWT menggunakan library jsonwebtoken
            res.status(200).json({ //mengirimkan respons
                succes: true,
                logged: true,
                message: 'login succes',
                token: token,
                data: userCek
            })
        }else{
            res.status(404).json({
                succes: false,
                logged: false,
                message: 'username or password invalid'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}

export const authorize = async(req,res, next) => {
    try {
        const authHeader = req.headers['authorization'] //Mengambil nilai header Authorization dari objek permintaan
        console.log("cek authHeader "+authHeader) //Menampilkan nilai authHeader di konsol untuk tujuan debugging
        if(authHeader){
            const token = authHeader.split(' ')[1]
            const verifiedUser = jwt.verify(token, secretKey)
            if(!verifiedUser){
                res.json({
                    succes: false,
                    auth: false,
                    message: "cannot permission to acces"
                })
            }
            else{
                req.user = verifiedUser
                next()
            }
        }else{
            res.json({
                succes: false,
                message: "can't permission access"
            })
        }
    } catch (error) {
        console.log(error);
        if (error.name === 'JsonWebTokenError') {
          return res.json({
            success: false,
            auth: false,
            message: 'Invalid token',
          });
        }
      
    }
}