const express = require("express"),
    cors = require("cors"),
    { config } = require("dotenv"),
    db = require("./Model/connectDB.js"),
    app = express(),
    authRoute = require("./routes/authRoute.js"),
    bannerRoute = require("./routes/bannerRoute.js"),
    courseRoute = require("./routes/courseRoute.js"),
    userRoute = require("./routes/userRoute.js"),
    { json, urlencoded } = require("body-parser");
const path = require("path");

config();
db();
app.use(json({
    limit: '50mb'
}))
app.use(urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true
}));
app.use(express.static('./uploads'));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/v1/auth", authRoute);
app.use("/v1/course", bannerRoute);
app.use("/v1/course", courseRoute);
app.use("/v1/user", userRoute);

app.listen(process.env.PORT || 8000, () => {
    console.log("Server is running in http://localhost:8000...");
})