import Season from '../model/season.js';
import BaseGNLBackendService from './base_service.js';

class SeasonService extends BaseGNLBackendService {
    async getSeason(seasonId) {
        console.debug(`Fetching season with ID: ${seasonId}`);
        const result = await this.get(`seasons/${seasonId}`);
        console.debug(`Received response:`, result);
        return new Season(result);
    }

    async updateSeason(seasonId, seasonInstance) {
        if (!seasonInstance || !seasonId) {
            console.error(`Season or season ID not defined:`, seasonInstance);
            throw new Error(`Season or season ID not defined: ${seasonInstance}`);
        }
        console.debug(`Updating season with ID: ${seasonId}, data:`, seasonInstance.toObject());
        const result = await this.put(`seasons/${seasonId}`, seasonInstance.toObject());
        console.debug(`Received response:`, result);
        return new Season(result);
    }

    async createSeason(seasonInstance) {
        if (!seasonInstance) {
            console.error(`Season not defined:`, seasonInstance);
            throw new Error(`Season not defined: ${seasonInstance}`);
        }
        console.debug(`Creating new season with data:`, seasonInstance.toObject());
        const result = await this.post(`seasons`, seasonInstance.toObject());
        console.debug(`Received response:`, result);
        return new Season(result);
    }

    async deleteSeason(seasonId) {
        if (!seasonId) {
            console.error(`Season ID not defined: ${seasonId}`);
            throw new Error(`Season ID not defined: ${seasonId}`);
        }
        console.debug(`Deleting season with ID: ${seasonId}`);
        await this.delete(`seasons/${seasonId}`);
        console.debug(`Season with ID ${seasonId} deleted successfully`);
        return true;
    }

    async getAllSeasons(options = {}) {
        console.debug(`Fetching all seasons`);
        const seasons = await this.get(`seasons`, this.buildPagingParams(options));
        console.debug(`Received response:`, seasons);
        return seasons.map(seasonData => new Season(seasonData));
    }

    async searchSeasons(searchString) {
        if (!searchString) {
            console.error(`Search String not defined: ${searchString}`);
            throw new Error(`Search String not defined: ${searchString}`);
        }
        console.debug(`Searching seasons with query: ${searchString}`);
        const seasons = await this.search(`seasons/search`, searchString);
        console.debug(`Received response:`, seasons);
        return seasons.map(seasonData => new Season(seasonData));
    }

    async addTeams(seasonId, teamIds) {
        if (!seasonId || !teamIds || teamIds.length === 0) {
            console.error(`Invalid season ID or team IDs`, { seasonId, teamIds });
            throw new Error(`Invalid season ID or team IDs`);
        }
        console.debug(`Adding teams ${teamIds} to season with ID: ${seasonId}`);
        const result = await this.post(`seasons/addTeams/${seasonId}`, { team_ids: teamIds });
        console.debug(`Received response:`, result);
        return new Season(result);
    }

    async removeTeams(seasonId, teamIds) {
        if (!seasonId || !teamIds || teamIds.length === 0) {
            console.error(`Invalid season ID or team IDs`, { seasonId, teamIds });
            throw new Error(`Invalid season ID or team IDs`);
        }
        console.debug(`Removing teams ${teamIds} from season with ID: ${seasonId}`);
        const result = await this.post(`seasons/removeTeams/${seasonId}`, { team_ids: teamIds });
        console.debug(`Received response:`, result);
        return new Season(result);
    }

    async addMaps(seasonId, mapIds) {
        if (!seasonId || !mapIds || mapIds.length === 0) {
            console.error(`Invalid season ID or map IDs`, { seasonId, mapIds });
            throw new Error(`Invalid season ID or map IDs`);
        }
        console.debug(`Adding maps ${mapIds} to season with ID: ${seasonId}`);
        const result = await this.post(`seasons/addMaps/${seasonId}`, { map_ids: mapIds });
        console.debug(`Received response:`, result);
        return new Season(result);
    }

    async removeMaps(seasonId, mapIds) {
        if (!seasonId || !mapIds || mapIds.length === 0) {
            console.error(`Invalid season ID or map IDs`, { seasonId, mapIds });
            throw new Error(`Invalid season ID or map IDs`);
        }
        console.debug(`Removing maps ${mapIds} from season with ID: ${seasonId}`);
        const result = await this.post(`seasons/removeMaps/${seasonId}`, { map_ids: mapIds });
        console.debug(`Received response:`, result);
        return new Season(result);
    }
}

export default SeasonService;