const path = require("node:path");
const express = require("express");
const { inputCleaner, inputValidator } = require("./middleware");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

app.get("/", (_req, res) => {
  res.redirect("/form");
});

app.get("/form", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/submit", inputCleaner, inputValidator, (req, res) => {
  const { username, comment = "" } = req.body;
  res.send(
    `<h1>Submission received</h1>
<p><strong>Username:</strong> ${escapeHtml(username)}</p>
<p><strong>Comment:</strong> ${escapeHtml(comment)}</p>
<a href="/form">Back to form</a>`,
  );
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
