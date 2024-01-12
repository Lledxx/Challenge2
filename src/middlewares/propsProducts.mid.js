function propsProducts(req, res, next){
    const {title, photo, price} = req.body;
    if (!title || ! photo || ! price){
        return res.json({
            status: 400,
            message: `${req.method} ${req.url} fields missing`,
        })
    }else{
        return next();
    }
}

export default propsProducts