// import { nanoid } from 'nanoid'
// const nanoid  = require('nanoid');

const shortid = require('shortid');
 
// console.log();

const url = require("../models/url");


async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if(!body.url)
    {
        return res.status(400).json( {msg: "Provide an URL"} );
    }
    // const shortId = model.id = nanoid(8);
    const shortID = shortid.generate();
    await url.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });
    return res.render("home", {
        id: shortID,
    });
    // return res.status(201).json( {msg: "Entry Created"} );
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await url.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
};