function propsUsers(req, res, next){
    const {name, photo, email} = req.body;
    if (!name || ! photo || ! email){
        return res.json({
            status: 400,
            message: `${req.method} ${req.url} fields missing`,
        })
    }else{
        return next();
    }
}

export default propsUsers