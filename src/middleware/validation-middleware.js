export default function validationMw(err, req, res) {
    if (err.status) {
        res.status(err.status)
            .json({
                message: err.message,
                errors: err.errors
            });
    }
}