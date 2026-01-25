import User from './user.js';
import Match from './match.js';


class Series {
    constructor(data = {}) {
        this.id = data.id || null;
        this.match_id = data.match_id || null;
        this.match = data.match ? new Match(data.match) : null;
        this.date_time = data.date_time ? new Date(data.date_time) : null;
        this.caster = data.caster || null;
        this.player1_id = data.player1_id || null;
        this.player1 = data.player1 ? new User(data.player1) : null;
        this.player2_id = data.player2_id || null;
        this.player2 = data.player2 ? new User(data.player2) : null;
        this.player1_score = data.player1_score ?? null;
        this.player2_score = data.player2_score ?? null;
        this.player1_points = data.player1_points ?? null;
        this.player2_points = data.player2_points ?? null;
        this.host_player_id = data.host_player_id || null;
        this.is_fantasy_match = data.is_fantasy_match || false;
    }

    toObject() {
        return {
            match_id: this.match_id,
            date_time: this.date_time ? this.date_time.toISOString() : null,
            caster: this.caster,
            player1_id: this.player1_id,
            player2_id: this.player2_id,
            player1_score: this.player1_score,
            player2_score: this.player2_score,
            player1_points: this.player1_points,
            player2_points: this.player2_points,
            host_player_id: this.host_player_id,
            is_fantasy_match: this.is_fantasy_match
        };
    }

    toString() {
        return `Series(id=${this.id}, match_id=${this.match_id}, match=${this.match}, ` +
               `date_time=${this.date_time}, caster=${this.caster}, ` +
               `player1_id=${this.player1_id}, player1=${this.player1}, ` +
               `player2_id=${this.player2_id}, player2=${this.player2}, ` +
               `player1_score=${this.player1_score}, player2_score=${this.player2_score}, ` +
               `player1_points=${this.player1_points}, player2_points=${this.player2_points}, ` +
               `host_player_id=${this.host_player_id}, is_fantasy_match=${this.is_fantasy_match})`;
    }
}


export default Series;