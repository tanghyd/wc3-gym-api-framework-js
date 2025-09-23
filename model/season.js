import Map from './map.js';

class Season {
    constructor(data = {}) {
        this.id = data.id || null;
        this.name = data.name || '';
        this.number_weeks = data.number_weeks || null;
        this.series_per_week = data.series_per_week || null;
        this.pick_ban = data.pick_ban || null;
        this.maps = Array.isArray(data.maps) ? data.maps.map(map => new Map(map)) : [];
        this.discordRole = data.discordRole;
    }

    toObject() {
        return {
            name: this.name,
            number_weeks: this.number_weeks,
            pick_ban: this.pick_ban,
            series_per_week: this.series_per_week,
            discordRole: this.discordRole
        };
    }

    toString() {
        const mapsStr = this.maps.length ? this.maps.join(', ') : 'None';
        return `Season(id=${this.id}, name=${this.name}, number_weeks=${this.number_weeks}, ` +
               `series_per_week=${this.series_per_week}, pick_ban=${this.pick_ban}, maps=${mapsStr})`+
               `discordRole=${this.discordRole}`;
    }
}

export default Season;