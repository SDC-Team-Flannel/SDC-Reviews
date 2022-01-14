const mongoose = require('mongoose');
const Promise = require('bluebird');
Promise.promisifyAll(mongoose);
mongoose.connect('mongodb://localhost/sdc');

const schemas = require('./server/src/datamodels/mongoModel.js');

let reviewSchema = mongoose.Schema(schemas.reviewsSchema);
let review = mongoose.model('review', reviewSchema);

let charReviewSchema = mongoose.Schema(schemas.charReviewsSchema);
let charReview = mongoose.model('charReview', charReviewSchema);

let characteristicsSchema = mongoose.Schema(schemas.characteristicsSchema);
let characteristic = mongoose.model('characteristic', characteristicsSchema);

let reviewsPhotosSchema = mongoose.Schema(schemas.reviewsPhotosSchema);
let reviewPhoto = mongoose.model('reviewPhoto', reviewsPhotosSchema);
