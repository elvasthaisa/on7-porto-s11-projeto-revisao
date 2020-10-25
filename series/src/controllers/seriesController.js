const series = require('../models/series.json');
const fs = require('fs');

const getAllSeries = (req, res) => {
    console.log(req.url);
    res.status(200).send(series);
}

const getSerieById = (req, res) => {
    const serieId = req.params.id;
    const serieFound = series.find(serie => serie.id == serieId)

    if (serieFound) {
        res.status(200).send(serieFound)
    } else {
        res.status(404).send({ message: "Série não encontrada" })
    }

    res.status(200).send(serieFound)
}

const postSerie = (req, res) => {
    console.log(req.body);
    const { id, name, genre, synopsis, liked, seasons } = req.body;
    series.push({ id, name, genre, synopsis, liked, seasons })

    fs.writeFile('./src/models/series.json', JSON.stringify(series), 'utf8', (err) => {
        if (err) {
            return res.status(424).send({ message: err })
        }
        console.log("Arquivo atualizado com sucesso!");
    });

    res.status(200).send(series)
}

const createSeason = (req, res) => {
    console.log(req.body);

    const serieId = req.params.id;
    const serieFiltrada = series.find((serie) => serie.id == serieId);

    const { id, code, episodes } = req.body;
    serieFiltrada.seasons.push({ id, code, episodes })

    fs.writeFile('./src/models/series.json', JSON.stringify(series), 'utf8', (err) => {
        if (err) {
            return res.status(424).send({ message: err })
        }
        console.log('Arquivo criado com sucesso!')
    })

    return res.status(200).send(series);
}

const putSerie = (req, res) => {
    const serieId = req.params.id;
    const serieToUpdate = req.body;
    const serieFiltrada = series.find((serie) => serie.id == serieId);
    const serieIndex = series.indexOf(serieFiltrada);

    series.splice(serieIndex, 1, serieToUpdate);

    fs.writeFile('./src/models/series.json', JSON.stringify(series), 'utf8', (err) => {
        if (err) {
            return res.status(424).send({ message: err })
        }
        console.log('Arquivo atualizado com sucesso');
    })

    res.status(200).send(series)
}

const deleteSerie = (req, res) => {
    const serieId = req.params.id;
    const serieFound = series.find(serie => serie.id == serieId);
    const index = series.indexOf(serieFound);

    series.splice(index, 1)

    fs.writeFile('./src/models/series.json', JSON.stringify(series), 'utf8', (err) => {
        if (err) {
            return res.status(424).send({ message: err })
        }
        console.log('Arquivo deletado com sucesso');
    })
    res.status(200).send(series)
}

const likedSerie = (req, res) => {
    const serieId = req.params.id;
    const liked = req.body.watched;

    const serieToUpdate = series.find(serie => serie.id == serieId);
    const serieIndex = series.indexOf(serieToUpdate);

    if (serieIndex >= 0) {
        serieToUpdate.liked = liked;
        series.splice(serieIndex, 1, serieToUpdate)
    } else {
        res.status(404).send({ message: "Série não encontrada para informar se gostou da série ou não"})
    }

    fs.writeFile("./src/models/series.json", JSON.stringify(series), 'utf8', (err) => {
        if (err) {
            res.status(424).send({ message: err })
        } else {
            console.log("Arquivo atualizado com sucesso!")
            const serieUpdated = series.find((movie) => movie.id == movieId) 
            res.status(200).send(serieUpdated) 
        }
    })
}

module.exports = {
    getAllSeries,
    getSerieById,
    postSerie,
    createSeason,
    putSerie,
    deleteSerie,
    likedSerie
}