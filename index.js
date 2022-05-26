require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// Urlparser
app.post("/api/shorturl", function (req, res) {
  console.log(req.body);
  const bodyurl = req.body.url;

  const something = dns.lookup(
    urlparser.parse(bodyurl).hostname,
    (error, address) => {
      if (!address) {
        res.json({ error: "Invalid URL" });
      } else {
        const url = new Url({ url: bodyurl });
        url.save((error, data) => {
          res.json({
            original_url: data.url,
            short_url: data.id,
          });
        });
      }
      console.log("dns", error);
      console.log("address", address);
    }
  );

  console.log("something", something);
});

app.get("/api/shorturl/:id", (req, res) => {
  const id = req.params.id;
  Url.findById(id, (error, data) => {
    if (!data) {
      res.json({ error: "Invalid URL" });
    } else {
      res.redirect(data.url);
    }
  });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
