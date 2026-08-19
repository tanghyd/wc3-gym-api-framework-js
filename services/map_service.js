import Map from '../model/map.js';
import BaseGNLBackendService from './base_service.js';

class MapService extends BaseGNLBackendService {
    async searchMaps(searchString) {
        if (!searchString) {
            console.error(`Search String not defined: ${searchString}`);
            throw new Error(`Search String not defined: ${searchString}`);
        }
        console.debug(`Searching maps with query: ${searchString}`);
        const maps = await this.search(`maps/search`, searchString);
        console.debug(`Received response:`, maps);
        return maps.map(mapData => new Map(mapData));
    }

    async getMap(mapId) {
        console.debug(`Fetching map with ID: ${mapId}`);
        const result = await this.get(`maps/${mapId}`);
        console.debug(`Received response:`, result);
        return new Map(result);
    }

    async updateMap(mapId, mapInstance) {
        if (!mapInstance || !mapId) {
            console.error(`Map or map ID not defined:`, mapInstance);
            throw new Error(`Map or map ID not defined: ${mapInstance}`);
        }
        console.debug(`Updating map with ID: ${mapId}, data:`, mapInstance.toObject());
        const result = await this.put(`maps/${mapId}`, mapInstance.toObject());
        console.debug(`Received response:`, result);
        return new Map(result);
    }

    async createMap(mapInstance) {
        if (!mapInstance) {
            console.error(`Map not defined:`, mapInstance);
            throw new Error(`Map not defined: ${mapInstance}`);
        }
        console.debug(`Creating new map with data:`, mapInstance.toObject());
        const result = await this.post(`maps`, mapInstance.toObject());
        console.debug(`Received response:`, result);
        return new Map(result);
    }

    async deleteMap(mapId) {
        if (!mapId) {
            console.error(`Map ID not defined: ${mapId}`);
            throw new Error(`Map ID not defined: ${mapId}`);
        }
        console.debug(`Deleting map with ID: ${mapId}`);
        await this.delete(`maps/${mapId}`);
        console.debug(`Map with ID ${mapId} deleted successfully`);
        return true;
    }

    async getAllMaps(options = {}) {
        console.debug(`Fetching all maps`);
        const maps = await this.get(`maps`, this.buildPagingParams(options));
        console.debug(`Received response:`, maps);
        return maps.map(mapData => new Map(mapData));
    }
}

export default MapService;