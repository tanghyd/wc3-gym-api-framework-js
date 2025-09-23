import User from '../model/user.js';
import BaseGNLBackendService from './base_service.js';

class UserService extends BaseGNLBackendService {
    async getUserByDiscord(discordId) {
        if (!discordId) {
            console.error(`Discord Id not defined: ${discordId}`);
            throw new Error(`Discord Id not defined: ${discordId}`);
        }
        console.debug(`Searching for user by Discord id: ${discordId}`);
        const users = await this.searchUsers(`discordId==${discordId}`);
        if (!users || users.length === 0) {
            console.debug(`No user found with Discord id: ${discordId}`);
            return null;
        }
        if (users.length > 1) {
            console.error(`More than one user found with Discord id: ${discordId}`);
            throw new Error(`More than one user found by Discord id: ${discordId}`);
        }
        const user = users[0];
        console.debug(`Found user:`, user);
        return new User(user);
    }

    async searchUsers(searchString) {
        if (!searchString) {
            console.error(`Search String not defined: ${searchString}`);
            throw new Error(`Search String not defined: ${searchString}`);
        }
        console.debug(`Searching users with query: ${searchString}`);
        const users = await this.search(`users/search`, searchString);
        console.debug(`Received response:`, users);
        return users.map(userData => new User(userData));
    }

    async getUser(userId) {
        console.debug(`Fetching user with ID: ${userId}`);
        const result = await this.get(`users/${userId}`);
        console.debug(`Received response:`, result);
        return new User(result);
    }

    async updateUser(userId, userInstance) {
        if (!userInstance || !userId) {
            console.error(`User or user ID not defined:`, userInstance);
            throw new Error(`User or user ID not defined: ${userInstance}`);
        }
        console.debug(`Updating user with ID: ${userId}, data:`, userInstance.toObject());
        const result = await this.put(`users/${userId}`, userInstance.toObject());
        console.debug(`Received response:`, result);
        return new User(result);
    }

    async createUser(userInstance) {
        if (!userInstance) {
            console.error(`User not defined:`, userInstance);
            throw new Error(`User not defined: ${userInstance}`);
        }
        console.debug(`Creating new user with data:`, userInstance.toObject());
        const result = await this.post(`users`, userInstance.toObject());
        console.debug(`Received response:`, result);
        return new User(result);
    }

    async deleteUser(userId) {
        if (!userId) {
            console.error(`User ID not defined: ${userId}`);
            throw new Error(`User ID not defined: ${userId}`);
        }
        console.debug(`Deleting user with ID: ${userId}`);
        await this.delete(`users/${userId}`);
        console.debug(`User with ID ${userId} deleted successfully`);
        return true;
    }

    async getAllUsers() {
        console.debug(`Fetching all users`);
        const users = await this.get(`users`);
        console.debug(`Received response:`, users);
        return users.map(userData => new User(userData));
    }
}

export default UserService;