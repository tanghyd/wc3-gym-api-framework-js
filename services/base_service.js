import axios from "axios";
import jwt from "jsonwebtoken";

class BaseGNLBackendService {
  static HTTPMethods = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    PATCH: "PATCH",
    HEAD: "HEAD",
    OPTIONS: "OPTIONS",
  };

  constructor(url, adminToken) {
    this.adminToken = adminToken;
    this.url = url;
    this.token = null;
    this.refreshToken = null;
    console.debug(`Backend URL: ${this.url}`);
  }

  async sendRequest(method, endpoint, data = null, headers = {}, params = null) {
    const url = this.buildURL(endpoint);
    try {
      console.debug(`Sending Request: ${method} ${url}, data:`, data, "headers:", headers, "params:", params);
      
      const response = await axios({
        method,
        url,
        data,
        headers,
        params,
      });

      if ([200, 201].includes(response.status)) {
        console.debug(`Request successful: ${response.status}`);
        return response.data;
      }
      if (response.status === 204) {
        console.debug(`Request successful: ${response.status}`);
        return null;
      }

      throw new Error(`Request failed with status ${response.status}: ${response.data}`);
    } catch (error) {
      console.error("Request Error:", error.message);
      throw new Error(`Exception occurred: ${error.message}`);
    }
  }

  async login() {
    if (!this.refreshToken) {
      const response = await this.sendRequest(BaseGNLBackendService.HTTPMethods.POST, "/login", { token: this.adminToken });
      if (response?.access_token) {
        this.token = response.access_token;
        this.refreshToken = response.refresh_token;
      } else {
        throw new Error(`Login failed, token not retrieved: ${response}`);
      }
    } else {
      try{
        const response = await this.sendRequest(BaseGNLBackendService.HTTPMethods.POST, "/refresh", null, { Authorization: `Bearer ${this.refreshToken}` });
        if (response?.access_token) {
          this.token = response.access_token;
        } else {
          throw new Error(`Login failed, token not retrieved: ${response}`);
        }
      } catch (error) {
        console.error("Could not refresh token, retry login: ", error);
        this.refreshToken = null;
        await this.login();
      }
      
    }
  }

  buildURL(endpoint) {
    return `${this.url}/${endpoint.startsWith("/") ? endpoint.slice(1) : endpoint}`;
  }

  async get(endpoint, params = null) {
    return this.sendRequest(BaseGNLBackendService.HTTPMethods.GET, endpoint, null, {}, params);
  }

  async post(endpoint, data = null) {
    await this.ensureValidToken();
    return this.sendRequest(BaseGNLBackendService.HTTPMethods.POST, endpoint, data, { Authorization: `Bearer ${this.token}` });
  }

  async search(endpoint, search_str = null, options = {}) {
    await this.ensureValidToken();
    let query = null;
    if (search_str) {
      query = {'query':search_str};
    }
    const paging = this.buildPagingParams(options);
    if (paging) {
      query = { ...(query || {}), ...paging };
    }
    return this.sendRequest(BaseGNLBackendService.HTTPMethods.POST, endpoint, null, { Authorization: `Bearer ${this.token}`}, query);
  }

  // builds a {limit, offset} params object, or null if neither is set
  buildPagingParams({ limit, offset } = {}) {
    const params = {};
    if (limit !== undefined) params.limit = limit;
    if (offset !== undefined) params.offset = offset;
    return Object.keys(params).length ? params : null;
  }

  async put(endpoint, data = {}) {
    await this.ensureValidToken();
    return this.sendRequest(BaseGNLBackendService.HTTPMethods.PUT, endpoint, data, { Authorization: `Bearer ${this.token}` });
  }

  async delete(endpoint) {
    await this.ensureValidToken();
    return this.sendRequest(BaseGNLBackendService.HTTPMethods.DELETE, endpoint, null, { Authorization: `Bearer ${this.token}` });
  }

  async ensureValidToken() {
    if (await this.isTokenExpired()) {
      await this.login();
    }
  }

  async isTokenExpired() {
    try {
      if (!this.token) return true;
      const decoded = jwt.decode(this.token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded?.exp ? currentTime > decoded.exp : true;
    } catch {
      console.error("Invalid token format.");
      return true;
    }
  }
}

export default BaseGNLBackendService;