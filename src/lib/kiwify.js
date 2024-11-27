import axios from 'axios';

const KIWIFY_API_URL = 'https://api.kiwify.com.br';

class KiwifyAPI {
  constructor() {
    this.clientId = '9b810740-2cfc-4489-bf41-ddb0bd00fc98';
    this.clientSecret = 'eeb33a26d3868ab9df73c671f421968340a3bdf2da0cc5d279f8a5286ba74cfb';
    this.accountId = 'iDq5JE6cjG3Kp1A';
    this.accessToken = null;
  }

  async getAccessToken() {
    try {
      const response = await axios.post(`${KIWIFY_API_URL}/v1/oauth/token`, {
        grant_type: 'client_credentials',
        client_id: this.clientId,
        client_secret: this.clientSecret,
      });

      this.accessToken = response.data.access_token;
      return this.accessToken;
    } catch (error) {
      console.error('Error getting Kiwify access token:', error);
      throw error;
    }
  }

  async request(method, endpoint, data = null) {
    if (!this.accessToken) {
      await this.getAccessToken();
    }

    try {
      const response = await axios({
        method,
        url: `${KIWIFY_API_URL}${endpoint}`,
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        data,
      });

      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        await this.getAccessToken();
        return this.request(method, endpoint, data);
      }
      throw error;
    }
  }

  // Subscription Management
  async getSubscriptions() {
    return this.request('GET', `/v1/accounts/${this.accountId}/subscriptions`);
  }

  async getSubscription(subscriptionId) {
    return this.request('GET', `/v1/accounts/${this.accountId}/subscriptions/${subscriptionId}`);
  }

  // Customer Management
  async createCustomer(data) {
    return this.request('POST', `/v1/accounts/${this.accountId}/customers`, data);
  }

  async getCustomer(customerId) {
    return this.request('GET', `/v1/accounts/${this.accountId}/customers/${customerId}`);
  }

  // Product Management
  async getProducts() {
    return this.request('GET', `/v1/accounts/${this.accountId}/products`);
  }

  async getProduct(productId) {
    return this.request('GET', `/v1/accounts/${this.accountId}/products/${productId}`);
  }
}

export const kiwifyAPI = new KiwifyAPI();