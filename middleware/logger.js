// logger middleware: logs information about every incoming request. help to tract who is accessing your API, what route they are hitting and when they accessed it

const logRequest = (req, res, next) => {
    const timestamp = new Date().toISOString()
    console.log(`${timestamp} - ${req.method} - ${req.url} from ${req.ip}`)
    next()
}

module.exports = logRequest