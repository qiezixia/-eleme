import {get, post} from './api.js'

export default {
    getSeller() {
        return get('api/seller');
    },
    getGoods() {
        return get('api/goods');
    },
    getRating() {
        return get('/api/ratings');
    }
}