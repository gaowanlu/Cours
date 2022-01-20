const checkContentType = {
    'application/json': (contentType) => {
        return null !== contentType.match('application/json');
    }
}

module.exports = checkContentType;