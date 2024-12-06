

export const admin = async(req,res, next)=>{
    const userRole = req.user.role
    if(userRole == 'admin'){
        next()
    }else{
        res.status(403).json({
            success: false,
            auth: false,
            message: 'You are not admin'
        })
    }
}
export const siswa = async(req,res, next)=>{
    const userRole = req.user.role
    if(userRole == 'siswa'){
        next()
    }else{
        res.status(403).json({
            success: false,
            auth: false,
            message: 'You are not member'
        })
    }
}