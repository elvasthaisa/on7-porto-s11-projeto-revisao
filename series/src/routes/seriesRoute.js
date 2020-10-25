const express = require('express');
const router = express.Router();
const controller = require('../controllers/seriesController');

router.get('/', controller.getAllSeries);
router.get('/:id', controller.getSerieById);
router.post('/', controller.postSerie);
router.post('/:id/season', controller.createSeason);
router.put('/:id', controller.putSerie);
router.delete('/:id', controller.deleteSerie);
router.patch('/:id/liked', controller.likedSerie);
router.post('/:id/season/:seasonId/episode', controller.postEpisode);

module.exports = router;