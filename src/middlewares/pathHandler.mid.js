const pathHandler = (req, res, next) => {
    console.error(`${req.method} ${req.url} not found endpoint`)
    return res.json({
        status: 404,
        message: `${req.method} ${req.url} not found endpoint`,
    })
}

export default pathHandler