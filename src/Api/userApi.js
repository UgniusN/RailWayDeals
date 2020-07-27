import HTTP from './'

export default {
    getUser() {
        return HTTP.get('/api/user')
    },
}