import Series from '../model/series.js';
import BaseGNLBackendService from './base_service.js';

class SeriesService extends BaseGNLBackendService {
    async getSeries(seriesId) {
        console.debug(`Fetching series with ID: ${seriesId}`);
        const result = await this.get(`series/${seriesId}`);
        console.debug(`Received response:`, result);
        return new Series(result);
    }

    async updateSeries(seriesId, seriesInstance) {
        if (!seriesInstance || !seriesId) {
            console.error(`Series or series ID not defined:`, seriesInstance);
            throw new Error(`Series or series ID not defined: ${seriesInstance}`);
        }
        console.debug(`Updating series with ID: ${seriesId}, data:`, seriesInstance.toObject());
        const result = await this.put(`series/${seriesId}`, seriesInstance.toObject());
        console.debug(`Received response:`, result);
        return new Series(result);
    }

    async createSeries(seriesInstance) {
        if (!seriesInstance) {
            console.error(`Series not defined:`, seriesInstance);
            throw new Error(`Series not defined: ${seriesInstance}`);
        }
        console.debug(`Creating new series with data:`, seriesInstance.toObject());
        const result = await this.post(`series`, seriesInstance.toObject());
        console.debug(`Received response:`, result);
        return new Series(result);
    }

    async deleteSeries(seriesId) {
        if (!seriesId) {
            console.error(`Series ID not defined: ${seriesId}`);
            throw new Error(`Series ID not defined: ${seriesId}`);
        }
        console.debug(`Deleting series with ID: ${seriesId}`);
        await this.delete(`series/${seriesId}`);
        console.debug(`Series with ID ${seriesId} deleted successfully`);
        return true;
    }

    async getAllSeries() {
        // there is no plain GET /series route, so match every row via search
        console.debug(`Fetching all series`);
        const seriesList = await this.search(`series/search`, `id > 0`);
        console.debug(`Received response:`, seriesList);
        return seriesList.map(seriesData => new Series(seriesData));
    }

    async searchSeries(searchString) {
        if (!searchString) {
            console.error(`Search String not defined: ${searchString}`);
            throw new Error(`Search String not defined: ${searchString}`);
        }
        console.debug(`Searching series with query: ${searchString}`);
        const seriesList = await this.search(`series/search`, searchString);
        console.debug(`Received response:`, seriesList);
        return seriesList.map(seriesData => new Series(seriesData));
    }

    async searchSeriesBySeason(seasonId, searchString = null) {
        console.debug(`Searching series for season[${seasonId}] with query: ${searchString}`);
        const seriesList = await this.search(`series/season/${seasonId}/search`, searchString);
        console.debug(`Received response:`, seriesList);
        return seriesList.map(seriesData => new Series(seriesData));
    }

    async searchSeriesBySeasonAndPlayday(seasonId, playday, searchString = null) {
        console.debug(`Searching series for season[${seasonId}] and playday[${playday}] with query: ${searchString}`);
        const seriesList = await this.search(`series/season/${seasonId}/playday/${playday}/search`, searchString);
        console.debug(`Received response:`, seriesList);
        return seriesList.map(seriesData => new Series(seriesData));
    }
}

export default SeriesService;