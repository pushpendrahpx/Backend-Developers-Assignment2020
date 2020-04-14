// Just Importing All The Required Modules
let {
    app,
    mongoose,
    redis,
    bodyParser,
    express,
    SwaggerJsDoc,
    SwaggerUI
} = require("./imports");

const SwaggerOptions = {
    swaggerDefinition:{
        info:{
            title: 'Backend APIs Documentation',
            description: '... Describes APIs Uses',
            contact:{
                name:"Pushpendra Vishwakarma"
            },
            servers:["http://localhost:5000"]
        }
    },
    apis:["server.js"]
};

const swaggerDocs = SwaggerJsDoc(SwaggerOptions);
app.use('/api-docs',SwaggerUI.serve,SwaggerUI.setup(swaggerDocs));



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

/** 
*   @swagger
*   /api/jobs/search/{id} :
*   get:
*      produces:
*       - application/json
*      parameters:
*       - in: path
*         name: id
*         description: Posted Jobs Object ID As in MongoDB. <br /> This APIs Uses Cache As If Cache Miss happens then it Searches in DB. <br /> You can Try Some Other Also Object ID Also <strong> 5e9596fbfb577e7e2f8880ed </strong>
*         type: string
*         required: true
*         value: 5e95942ca88cac782c21f627
*     
*      description: Use to Request All Jobs Posts
*      responses:
*           '200': 
*               description: 
*
*   @swagger
*   /api/jobs/create :
*   post:
*      produces:
*       - application/json
*      parameters:
*       - in: body
*         required: true
*         name: user
*         description: The user to create.<br /> 
*         schema:
*           type: object
*           required:
*             - work
*             - position
*             - sallary
*           properties:
*             work:
*               type:string
*             sallary:
*               type:string
*             position:
*               type:string
*     
*      description: Use to Request All Jobs Posts
*      responses:
*           '200': 
*               description: 
*
*
*   @swagger
*   /api/jobs/update :
*   put:
*      produces:
*       - application/json
*      parameters:
*       - in: body
*         required: true
*         name: user
*         description: This endpoint Update <br /> Accepts 2 parameters in Body first <b>postId</b>, and second <b>sallary</b> as JSON Data
*         schema:
*           type: object
*           required:
*             - sallary
*             - postId
*           properties:
*             sallary:
*               type:string
*             postId:
*               type:string
*     
*      description: Use to Request All Jobs Posts
*      responses:
*           '200': 
*               description: 
*
*
*
*   @swagger
*   /api/jobs/delete/{id} :
*   delete:
*      produces:
*       - application/json
*      parameters:
*       - in: path
*         name: id
*         description: Posted Jobs Object ID As in MongoDB. <br /> This API Deletes the Job Posted on MongoDB <br /> You can Try Some Other Also Object ID Also <strong> 5e9596fbfb577e7e2f8880ed </strong>
*         type: string
*         required: true
*         value: 5e95942ca88cac782c21f627
*     
*      description: Use to Request All Jobs Posts
*      responses:
*           '200': 
*               description: 
*
*   @swagger
*   /api/jobs/getResultsWithPendingStatusJobs :
*   post:
*      produces:
*       - application/json
*     
*      description: This API EndPoint Returns All Jobs With Pending Status, as this API also uses ASYNC call to MongoDB by using mongoose which itself uses ASYNC Network call to MongoDB URI <br /> <h1> <strong>isOpen</strong> property in Jobs Object tells that it is Pending as its value is true. <br /> This also returns Object ID with it </h1>
*      responses:
*           '200': 
*               description: 
*
*   @swagger
*   /api/users/submit :
*   put:
*      produces:
*       - application/json
*      parameters:
*       - in: body
*         required: true
*         name: user
*         description: This endpoint Creates Account of Each User <br /> Accepts 4 parameters in Body <b>name</b>,<b>email</b>,<b>phone</b> and <b>password</b> as JSON Data
*         schema:
*           type: object
*           required:
*             - name
*             - email
*             - phone
*             - password
*           properties:
*             name:
*               type:string
*             email:
*               type:string
*             phone:
*               type:string
*             password:
*               type:string
*     
*      description: Use to Request All Jobs Posts
*      responses:
*           '200': 
*               description: 
*
*
*/


app.use('/api/jobs',Jobs);
app.use('/api/users',Users);
app.listen(port,()=>{
    console.log("Server Started Listening")
})
