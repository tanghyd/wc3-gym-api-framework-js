import FantasyTeam from '../model/fantasy_team.js';
import BaseGNLBackendService from './base_service.js';

class FantasyTeamService extends BaseGNLBackendService {
    async getFantasyTeam(teamId) {
        console.debug(`Fetching fantasy team with ID: ${teamId}`);
        const result = await this.get(`fantasy/teams/${teamId}`);
        console.debug(`Received response:`, result);
        return new FantasyTeam(result);
    }

    async updateTeam(teamId, fteam) {
        if (!fteam || !teamId) {
            console.error(`Fantasy Team or team ID not defined:`, fteam);
            throw new Error(`Fantasy Team or team ID not defined: ${fteam}`);
        }
        console.debug(`Updating team with ID: ${teamId}, data:`, fteam.toObject());
        const result = await this.put(`fantasy/teams/${teamId}`, fteam.toObject());
        console.debug(`Received response:`, result);
        return new FantasyTeam(result);
    }

    async createTeam(fteam) {
        if (!fteam) {
            console.error(`Fantasy Team not defined:`, fteam);
            throw new Error(`Fantasy Team not defined: ${fteam}`);
        }
        console.debug(`Creating new team with data:`, fteam.toObject());
        const result = await this.post(`fantasy/teams`, fteam.toObject());
        console.debug(`Received response:`, result);
        return new FantasyTeam(result);
    }

    async deleteTeam(teamId) {
        if (!teamId) {
            console.error(`Fantasy Team ID not defined: ${teamId}`);
            throw new Error(`Fantasy Team ID not defined: ${teamId}`);
        }
        console.debug(`Deleting fantasy team with ID: ${teamId}`);
        await this.delete(`fantasy/teams/${teamId}`);
        console.debug(`Fantasy Team with ID ${teamId} deleted successfully`);
        return true;
    }

    async searchTeam(searchString) {
        if (!searchString) {
            console.error(`Search String not defined: ${searchString}`);
            throw new Error(`Search String not defined: ${searchString}`);
        }
        console.debug(`Searching teams with query: ${searchString}`);
        const teams = await this.search(`fantasy/teams/search`, searchString);
        console.debug(`Received response:`, teams);
        return teams.map(team => new FantasyTeam(team));
    }

    async getAllTeams(options = {}) {
        console.debug(`Fetching all fantasy teams`);
        const teams = await this.get(`fantasy/teams`, this.buildPagingParams(options));
        console.debug(`Received response:`, teams);
        return teams.map(team => new FantasyTeam(team));
    }

    async addPlayers(teamId, playerIds) {
        if (!teamId) {
            console.error(`Fantasy Team ID not defined: ${teamId}`);
            throw new Error(`Fantasy Team ID not defined: ${teamId}`);
        }
        if (!playerIds || playerIds.length === 0) {
            console.error(`No player IDs defined:`, playerIds);
            throw new Error(`No player IDs defined: ${playerIds}`);
        }
        console.debug(`Adding players ${playerIds} to fantasy team with ID: ${teamId}`);
        const result = await this.post(`fantasy/teams/addPlayers/${teamId}`, { player_ids: playerIds });
        console.debug(`Received response:`, result);
        return new FantasyTeam(result);
    }

    async removePlayers(teamId, playerIds) {
        if (!teamId) {
            console.error(`Fantasy Team ID not defined: ${teamId}`);
            throw new Error(`Fantasy Team ID not defined: ${teamId}`);
        }
        if (!playerIds || playerIds.length === 0) {
            console.error(`No player IDs defined:`, playerIds);
            throw new Error(`No player IDs defined: ${playerIds}`);
        }
        console.debug(`Removing players ${playerIds} from team with ID: ${teamId}`);
        const result = await this.post(`fantasy/teams/removePlayers/${teamId}`, { player_ids: playerIds });
        console.debug(`Received response:`, result);
        return new FantasyTeam(result);
    }
}

export default FantasyTeamService;