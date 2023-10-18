const mongoose = require("mongoose");

const password = process.argv[2];

const mongoUrl = `mongodb+srv://fso98blog:${password}@clusterblog.gcwin0o.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl);
