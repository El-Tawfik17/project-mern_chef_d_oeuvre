const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.qpmzmnp.mongodb.net/mern-project",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }

).then(() => console.log('conneted to MongoDb '))
    .catch((err) => console.log("Failed to connect to MongoDB", err));