const express = require("express");
const { inspect } = require("util");

const app = express();

app.get("/ip", async (req, res) => {
    if(!req.ip) {
        return res.status(500).json({
            error: true,
            data: "Can't get req ip"
        });
    }

    res.status(200).json({
        error: false,
        data: {
            ip: req.ip
        }
    });
});

app.get("/headers", async (req, res) => {
    res.setHeader("Dev-Url", req.url);
    res.status(200).json(req.headers);
});

app.listen(3000, "0.0.0.0", () => {
    console.log(`Server API ready`);
});