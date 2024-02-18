const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IntersectionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    coords: {
        type: Object,
        required: false
    }
}, { timestamps: true });

const Intersection = mongoose.model('Intersection', IntersectionSchema);
module.exports = Intersection;
