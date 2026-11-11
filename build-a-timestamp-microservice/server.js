import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

app.get("/api/:date", (req, res) => {
  let parsed;

  const shouldPass = new RegExp('^[0-9]+$').test(req.params['date']);

  console.log(shouldPass)
  console.log(req.params['date'])

  if (shouldPass) {
    parsed = req.params['date'] * 1
  } else {
    parsed = Date.parse(req.params["date"])
  }

  if (req.params['date'] === "") {
    parsed = Date.now()
  }

    const utc = new Date(parsed * 1).toUTCString();

    if (utc === "Invalid Date") {
      return res.json({ error: "Invalid Date" })
    }

    return res.json({unix: parsed, utc})
})

app.get("/api/", (req, res) => {
  const parsed = Date.now()

    const utc = new Date(parsed * 1).toUTCString();

    return res.json({unix: parsed, utc})
})

// Do not change code above this line

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
