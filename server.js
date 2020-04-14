// Just Importing All The Required Modules
let {
    app,
    mongoose,
    redis,
    bodyParser
} = require("./imports");

/* == Defining PORT Number == */
const port = process.env.PORT || 5000;

// To Accept JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))



// Adding Configuration File
let config = require("./config.json");

/* == Mongoose Connection == */
mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true},()=>{
    console.log("Connected to Mongo Database");
});

const Jobs = require('./Routes/JobRoutes');
const Users = require('./Routes/UserRoutes');

app.use('/api/jobs',Jobs);
app.use('/api/users',Users);
app.listen(port,()=>{
    console.log("Server Started Listening")
})
