const { mongoose } =require("./../imports");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{type:String},
    email:{type:String},
    phone:Number,
    password:String,
    appliedForJobs:[{type:Schema.Types.ObjectId,ref:'jobs'}]
});
const UserModel = mongoose.model('users',UserSchema);

// Like in LinkedIn as Jobs are posted Users Apply for that Job
const JobSchema = new Schema({
    work:String,
    position:String,
    postedDate:Date,
    isOpen:Boolean,
    sallary:Number,
    subscribers:[{type:Schema.Types.ObjectId,ref:'users'}]
});
const JobModel = mongoose.model('jobs',JobSchema);


module.exports = { 
    UserModel,
    JobModel 
}