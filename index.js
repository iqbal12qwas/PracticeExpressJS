
const express = require('express');
const bodyparser = require('body-parser');

const accountRoutes = require("./routes/account.js");
const signInRoutes = require("./routes/sign_in.js");
const signOutRoutes = require("./routes/sign_out.js");
const metabaseRoutes = require("./routes/metabase.js");
const callApiRoutes = require("./routes/call_api.js");
const uploadFileRoutes = require("./routes/upload_file.js");

const app = express();
const PORT = 4000;

app.use(bodyparser.json());

app.engine('html', require('ejs').renderFile);

app.get("/", (req, res) => res.send("Welcome to the Users API!"));

app.use("/account", accountRoutes);
app.use("/sign_in", signInRoutes);
app.use("/sign_out", signOutRoutes);

app.use("/metabase", metabaseRoutes);

app.use("/call_api", callApiRoutes);

app.use("/upload_file", uploadFileRoutes);

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
