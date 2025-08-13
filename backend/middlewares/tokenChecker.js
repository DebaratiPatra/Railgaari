const addTokenToRequest = (req, res, next) => {
    const bearer = req.headers['authorization'];
    if (!bearer) {
        return res.status(401).send({ // changed from 404
            message: `TOKEN NOT FOUND`
        });
    }

    const token = bearer.split(' ')[1];
    if (!token || token === '') {
        return res.status(401).send({ // changed from 404
            message: `TOKEN NOT FOUND`
        });
    }

    req.token = token;
    next();
}

export {
    addTokenToRequest
}



// const addTokenToRequest=(req,res,next)=>{
//     const bearer=req.headers['authorization']
//     if(!bearer){
//         res.status(404).send({
//             message:`TOKEN NOT FOUND`
//         })
//     }else{
//         const token=bearer.split(' ')[1]
//         if(!token || token===''){
//             res.status(404).send({
//                 message:`TOKEN NOT FOUND`
//             })
//         }else{
//             req.token=token
//             next()
//         }
//     }
// }

// export {
//     addTokenToRequest
// }