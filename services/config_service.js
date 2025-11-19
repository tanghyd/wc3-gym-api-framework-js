import BaseGNLBackendService from "./base_service.js";

class ConfigService extends BaseGNLBackendService {
  /**
   * Get all configuration settings
   * @returns {Promise<Array>} Array of setting objects with key, value, and description
   */
  async getAllSettings() {
    const response = await this.get("/config/settings");
    return response.settings || [];
  }

  /**
   * Get a specific setting by key
   * @param {string} key - The setting key
   * @returns {Promise<Object>} Setting object with key, value, and description
   */
  async getSetting(key) {
    return await this.get(`/config/settings/${key}`);
  }

  /**
   * Get all settings as a key-value map
   * @returns {Promise<Object>} Object with setting keys as properties and values as strings
   */
  async getSettingsMap() {
    const settings = await this.getAllSettings();
    const map = {};
    settings.forEach(setting => {
      map[setting.key] = setting.value;
    });
    return map;
  }

  /**
   * Update multiple settings at once
   * @param {Object} settingsObj - Object with setting keys and values
   * @returns {Promise<Object>} Response with updated settings
   */
  async updateSettings(settingsObj) {
    return await this.put("/config/settings", { settings: settingsObj });
  }

  /**
   * Update a single setting
   * @param {string} key - The setting key
   * @param {string} value - The new value
   * @param {string} description - Optional description
   * @returns {Promise<Object>} Response with updated setting
   */
  async updateSetting(key, value, description = null) {
    const payload = { value };
    if (description) {
      payload.description = description;
    }
    return await this.put(`/config/settings/${key}`, payload);
  }

  /**
   * Delete a setting
   * @param {string} key - The setting key to delete
   * @returns {Promise<Object>} Response message
   */
  async deleteSetting(key) {
    return await this.delete(`/config/settings/${key}`);
  }
}

export default ConfigService;
