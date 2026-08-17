import Team from '../model/team.js';
import BaseGNLBackendService from './base_service.js';

class TeamService extends BaseGNLBackendService {
    async getTeam(teamId) {
        console.debug(`Fetching team with ID: ${teamId}`);
        const result = await this.get(`teams/${teamId}`);
        console.debug(`Received response:`, result);
        return new Team(result);
    }

    async updateTeam(teamId, teamInstance) {
        if (!teamInstance || !teamId) {
            console.error(`Team or team ID not defined:`, teamInstance);
            throw new Error(`Team or team ID not defined: ${teamInstance}`);
        }
        console.debug(`Updating team with ID: ${teamId}, data:`, teamInstance.toObject());
        const result = await this.put(`teams/${teamId}`, teamInstance.toObject());
        console.debug(`Received response:`, result);
        return new Team(result);
    }

    async createTeam(teamInstance) {
        if (!teamInstance) {
            console.error(`Team not defined:`, teamInstance);
            throw new Error(`Team not defined: ${teamInstance}`);
        }
        console.debug(`Creating new team with data:`, teamInstance.toObject());
        const result = await this.post(`teams`, teamInstance.toObject());
        console.debug(`Received response:`, result);
        return new Team(result);
    }

    async deleteTeam(teamId) {
        if (!teamId) {
            console.error(`Team ID not defined: ${teamId}`);
            throw new Error(`Team ID not defined: ${teamId}`);
        }
        console.debug(`Deleting team with ID: ${teamId}`);
        await this.delete(`teams/${teamId}`);
        console.debug(`Team with ID ${teamId} deleted successfully`);
        return true;
    }

    async searchTeam(searchString) {
        if (!searchString) {
            console.error(`Search String not defined: ${searchString}`);
            throw new Error(`Search String not defined: ${searchString}`);
        }
        console.debug(`Searching teams with query: ${searchString}`);
        const teams = await this.search(`teams/search`, searchString);
        console.debug(`Received response:`, teams);
        return teams.map(teamData => new Team(teamData));
    }

    async getAllTeams() {
        console.debug(`Fetching all teams`);
        const teams = await this.get(`teams`);
        console.debug(`Received response:`, teams);
        return teams.map(teamData => new Team(teamData));
    }

    async getTeamsForSeason(seasonId) {
        console.debug(`Fetching teams for season ID: ${seasonId}`);
        const teams = await this.get(`teams/season/${seasonId}`);
        console.debug(`Received response:`, teams);
        return teams.map(teamData => new Team(teamData));
    }

    async getTeamForSeason(seasonId, teamId) {
        console.debug(`Fetching team with ID: ${teamId} for season ID: ${seasonId}`);
        const result = await this.get(`teams/${teamId}/seasons/${seasonId}`);
        console.debug(`Received response:`, result);
        return new Team(result);
    }

    async addPlayer(teamId, seasonId, playerIds) {
        if (!teamId || !seasonId || !playerIds || playerIds.length === 0) {
            console.error(`Invalid team ID, season ID, or player IDs`, { teamId, seasonId, playerIds });
            throw new Error(`Invalid team ID, season ID, or player IDs`);
        }
        console.debug(`Adding players ${playerIds} to team with ID: ${teamId}`);
        const result = await this.post(`teams/addPlayers/${teamId}/seasons/${seasonId}`, { player_ids: playerIds });
        console.debug(`Received response:`, result);
        return new Team(result);
    }

    async removePlayer(teamId, seasonId, playerIds) {
        if (!teamId || !seasonId || !playerIds || playerIds.length === 0) {
            console.error(`Invalid team ID, season ID, or player IDs`, { teamId, seasonId, playerIds });
            throw new Error(`Invalid team ID, season ID, or player IDs`);
        }
        console.debug(`Removing players ${playerIds} from team with ID: ${teamId}`);
        const result = await this.post(`teams/removePlayers/${teamId}/seasons/${seasonId}`, { player_ids: playerIds });
        console.debug(`Received response:`, result);
        return new Team(result);
    }
}

export default TeamService;