import express from "express"

const app = express()

app.get("/", (req, res) => {
    return res.send("Welcome to Camper Bot's homepage!");
})

app.get("/hobbies", (req, res) => {
    return res.send("I cycle, go boating, and play guitar.");
})

app.get("/skills", (req, res) => res.send("JavaScript, Node.js, and Express.js!"))


app.get("/api/profile", (req,res) => res.json({
    name: "Camper Bot",
    hobbies: ['cycling', 'boating', 'guitar'],
    skills: ['JavaScript', 'Node.js', 'Express.js']
}))


function main() {
    app.listen(3000)
}

main()