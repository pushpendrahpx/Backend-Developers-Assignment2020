const router = require("express").Router();

const {redis} = require("./../imports");
const client = redis.createClient();

client.on("error", function(error) {
    console.error(error);
});

router.post('/submit',(req,res)=>{
    try{
        let {
            name,
            email,
            phone,
            password,
        } = req.body;
        console.log(name)
        const { UserModel } = require("./../Models/User");
        let User = new UserModel({
            name:name,
            email:email,
            phone:phone,
            password:password
        })
        console.log(User)
        User.save((err,docs)=>{
            if(!err)
            {   
                console.log(User._id)
                client.setex(JSON.stringify(User._id),3000,JSON.stringify(User))
                client.setex("LastUserRegistered",5000,JSON.stringify(User));


                res.status(200).json({
                    id:docs._id
                })
            }else{

                res.status(400).json({s:"S"})
            }
        })
    }catch(error){
        res.status(400).json({
            message:"Some Error There"
        })
    }
});
module.exports = router;
