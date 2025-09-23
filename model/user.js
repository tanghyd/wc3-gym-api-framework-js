class User {
    constructor(data = {}) {
        this.id = data.id || null;
        this.name = data.name || '';
        this.battleTag = data.battleTag || '';
        this.discordTag = data.discordTag || '';
        this.discordId = data.discordId || '';
        this.race = data.race || '';
        this.mmr = data.mmr || null;
        this.country = data.country || '';
        this.fantasy_tier = data.fantasy_tier || null;
    }

    toObject() {
        return {
            name: this.name,
            battleTag: this.battleTag,
            discordTag: this.discordTag,
            discordId: this.discordId,
            race: this.race,
            mmr: this.mmr,
            country: this.country,
            fantasy_tier: this.fantasy_tier
        };
    }

    toString() {
        return `User(id=${this.id}, name=${this.name}, battleTag=${this.battleTag}, ` +
               `discordTag=${this.discordTag}, discordId=${this.discordId}, race=${this.race}, mmr=${this.mmr}, ` +
               `country=${this.country}, fantasy_tier=${this.fantasy_tier})`;
    }
}

export default User;