const router = require("express").Router();

const {redis} = require("./../imports");
const client = redis.createClient();

client.on("error", function(error) {
    console.error(error);
});

const MiddleWare = (req,res,next)=>{

    
    let {id} = req.params;
    // console.log(id)


    // client.set(id, "value", redis.print);
    client.get(JSON.stringify(id),(err,data)=>{
        if(err){
            res.status(400).json({
                error:"Some Error"
            })
        }else
        if(data){
            res.status(200).json(JSON.parse(data))
        }else{
            next();
        }
    });

}

router.get('/search/:id',MiddleWare,(req,res)=>{
   
    try{
        console.log("Cached May be missed")
        const { id } = req.params;

        const {JobModel} = require("./../Models/User");
        JobModel.findById(id,(err,Job)=>{
            if(err){
                res.status(400).json({error:"Some Error "})
            }
            if(Job){
                client.setex(JSON.stringify(id),3000,JSON.stringify(Job));
                res.status(200).json(Job);
            }else{
                res.status(200).json({
                    error:"Job Doesnot exist"
                })
            }
        })

    }catch(e){
        res.status(400).json({
            message:"Some Internal ID"
        })
    }

    
})
router.post('/create',(req,res)=>{
    try{
        let {
            work,
            position,
            sallary
        } = req.body;

        const { JobModel } = require("./../Models/User");
        let newJob = new JobModel({
            work:work,
            position:position,
            postedDate:new Date(),
            isOpen:true,
            sallary:sallary
        })
        newJob.save((err,docs)=>{
            if(!err)
            {   
                console.log(newJob._id)
                client.setex(JSON.stringify(newJob._id),3000,JSON.stringify(newJob))
                res.status(200).json({
                    status:"Saved",
                    updated:docs,
                    id:docs._id
                })
            }
        })
    }catch(error){
        res.status(400).json({
            error:error,
            message:"Some Error There"
        })
    }
});
router.put('/update',(req,res)=>{
    try{
        let {postId} = req.body;

        let {sallary} = req.body;

        const { JobModel } = require("./../Models/User");
        console.log(sallary)
        JobModel.updateOne({_id:postId},{sallary:sallary},(err,docs)=>{
            if(err)
            res.status(400).json({
                message:"Failed to update Sallary"
            })
            else{

                client.setex(JSON.stringify(docs._id),3000,JSON.stringify(_id));

                res.status(200).json({
                    message:"Post SavedS",
                    docs
                })
               
            }
        })

    }catch(error){
        res.status(400).json({
            message:"Some Error There"
        })
    }
})

router.delete('/delete/:id',(req,res)=>{
    try{
        
        let {id} = req.params;
        console.log(id)
        const { JobModel } = require("./../Models/User");
        JobModel.deleteOne({_id:id},(err)=>{
            if(err){
                throw "Failed to delete"
            }else{

                client.get(id,(err,value)=>{
                    if(err){
                        console.log("Some Cache Error")
                    }else{
                        client.del(JSON.stringify(id),(err,v2)=>{
                            if(err)
                                console.log("Some Cache Error v2")
                            else console.log("Deleted from Cache Also")
                        })
                    }

                    
                })
                res.status(200).json({
                    message:"Job Post Deleted"
                })
            }
        })
        

    }catch(error){
        res.status(400).json({
            message:"Some Error There"
        })
    }
});

router.post('/getResultsWithPendingStatusJobs',(req,res)=>{
    console.log("GEt")
    let { JobModel } = require("./../Models/User");

    JobModel.find({},(err,allDocs)=>{
        if(err){
            res.status(400).json({error:"Some Error"})
        }else{
            res.status(200).json(allDocs)
        }
    })
})

module.exports = router;
