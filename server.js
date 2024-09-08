const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 5555;
const app = express();

app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
  res.render("index.html");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
