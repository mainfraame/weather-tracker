export default function decodeUriMw(req, res, next) {
    req.url = decodeURIComponent(req.url);
    next();
}