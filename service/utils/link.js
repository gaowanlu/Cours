function link() {
    let object = {
        get() {
            return this;
        },
        post() {
            return this;
        },
        after() {
            console.log('next');
            return this;
        },
        before() {
            console.log('before');
            return this;
        }
    }
    return object;
}

module.exports = link;