
// FORMAT PATH AND SUPPORT FOR DYNAMIC PATHS (ENV:VARS), exemple path: "%userprofile%/Downloads/hi.png"
function formatPath(path) {
    let d = process.env[(path=path.replaceAll("/","\\").replace(/\\+$/,"")).match(/^%.+%/gi)?.[0].replaceAll("%","")]
    return d?d+(path.match(/\\.+/gi)?.[0]||""):path
}


module.exports = {
    formatPath,
}