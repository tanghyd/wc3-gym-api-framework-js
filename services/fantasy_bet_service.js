import FantasyBet from '../model/fantasy_bet.js';
import BaseGNLBackendService from './base_service.js';

class FantasyBetService extends BaseGNLBackendService {
    async getFantasyBet(betId) {
        console.debug(`Fetching fantasy bet with ID: ${betId}`);
        const result = await this.get(`fantasy/bets/${betId}`);
        console.debug(`Received response:`, result);
        return new FantasyBet(result);
    }

    async updateBet(betId, fbet) {
        if (!fbet || !betId) {
            console.error(`Fantasy Bet or bet ID not defined:`, fbet);
            throw new Error(`Fantasy Bet or bet ID not defined: ${fbet}`);
        }
        console.debug(`Updating bet with ID: ${betId}, data:`, fbet.toObject());
        const result = await this.put(`fantasy/bets/${betId}`, fbet.toObject());
        console.debug(`Received response:`, result);
        return new FantasyBet(result);
    }

    async createBet(fbet) {
        if (!fbet) {
            console.error(`Fantasy Bet not defined:`, fbet);
            throw new Error(`Fantasy Bet not defined: ${fbet}`);
        }
        console.debug(`Creating new bet with data:`, fbet.toObject());
        const result = await this.post(`fantasy/bets`, fbet.toObject());
        console.debug(`Received response:`, result);
        return new FantasyBet(result);
    }

    async deleteBet(betId) {
        if (!betId) {
            console.error(`Fantasy Bet ID not defined: ${betId}`);
            throw new Error(`Fantasy Bet ID not defined: ${betId}`);
        }
        console.debug(`Deleting fantasy bet with ID: ${betId}`);
        await this.delete(`fantasy/bets/${betId}`);
        console.debug(`Fantasy bet with ID ${betId} deleted successfully`);
        return true;
    }

    async searchBet(searchString) {
        if (!searchString) {
            console.error(`Search String not defined: ${searchString}`);
            throw new Error(`Search String not defined: ${searchString}`);
        }
        console.debug(`Searching bets with query: ${searchString}`);
        const bets = await this.search(`fantasy/bets/search`, searchString);
        console.debug(`Received response:`, bets);
        return bets.map(bet => new FantasyBet(bet));
    }

    async getAllBets(options = {}) {
        console.debug(`Fetching all fantasy bets`);
        const bets = await this.get(`fantasy/bets`, this.buildPagingParams(options));
        console.debug(`Received response:`, bets);
        return bets.map(bet => new FantasyBet(bet));
    }
}

export default FantasyBetService;