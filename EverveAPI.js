const axios = require('axios');

class EverveAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.everve.net/v3/';
        this.format = 'json';
    }

    async makeRequest(endpoint, params = {}) {
        params.api_key = this.apiKey;
        params.format = this.format;
        const url = `${this.baseUrl}${endpoint}`;
        const response = await axios.get(url, { params });
        return response.data;
    }

    getUser() {
        return this.makeRequest('user');
    }

    getSocials() {
        return this.makeRequest('socials');
    }

    getCategories(id = null) {
        const endpoint = id ? `categories/${id}` : 'categories';
        return this.makeRequest(endpoint);
    }

    createOrder(params) {
        return this.makeRequest('orders', params);
    }

    getOrders(id = null) {
        const endpoint = id ? `orders/${id}` : 'orders';
        return this.makeRequest(endpoint);
    }

    updateOrder(id, params) {
        params.id = id;
        return this.makeRequest(`orders/${id}`, params);
    }

    deleteOrder(id) {
        return this.makeRequest(`orders/${id}`, { _method: 'DELETE' });
    }
}

// EXAMPLE
// (async () => {
//     const api = new EverveAPI('your_api_key_here');
//     const userInfo = await api.getUser();
//     console.log('User Info:', userInfo);
// })();
