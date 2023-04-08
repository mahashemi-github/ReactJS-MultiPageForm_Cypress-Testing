const express = require("express")
const app = express();

app.use(express.json())

app.get("/followerss", (req, res) => {
    res.json([
        {
          "id": 1,
          "name": "Shai",
          "image": "1.jpg"
        },
        {
          "id": 2,
          "name": "Nina",
          "image": "2.jpg"
        },
        {
          "id": 3,
          "name": "Raya",
          "image": "3.jpg"
        }
      ])
})

app.listen(4000, () => {
    console.log("Now Listening on Port 4000")
})




