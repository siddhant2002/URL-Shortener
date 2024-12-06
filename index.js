const express = require("express");

const { connect } = require("./connection");

const URL = require("./models/url");

const urlRoute = require("./routes/url");

const app = express();

app.use(express.json());

connect("mongodb://127.0.0.1:27017/short-url")
.then(() => console.log("Database connected"));

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push:
        {
            visitHistory:
            {
                timestamp : Date.now(),
            },
        },
    });
    res.redirect(entry.redirectURL);
})

const PORT = 8000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));