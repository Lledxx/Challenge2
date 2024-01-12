function propsOrders(req, res, next){
    const {pid, uid, quantity} = req.body;
    if (!pid || ! uid || ! quantity){
        return res.json({
            status: 400,
            message: `${req.method} ${req.url} fields missing`,
        })
    }else{
        return next();
    }
}

export default propsOrders