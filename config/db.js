const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://ElTawfik:fikmen25@17@cluster0.qpmzmnp.mongodb.net/mern-project", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:false,
}

).then(() => console.log('conneted to MongoDb '))
    .catch((err) => console.log("Failed to connect to MongoDB", err));