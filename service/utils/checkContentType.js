const checkContentType = {
    'application/json': (contentType) => {
        if (!contentType || typeof contentType !== "string") {
            return false;
        }
        return null !== contentType.toString().match('application/json');
    }
}

module.exports = checkContentType;