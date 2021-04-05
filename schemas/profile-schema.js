const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
}

const profileSchema = mongoose.Schema ({
    guildId: reqString,
    userId: reqString,
    points: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('profiles', profileSchema)