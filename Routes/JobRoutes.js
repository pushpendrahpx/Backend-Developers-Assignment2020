const router = require("express").Router();

router.get('/search/:query',(req,res)=>{
    let {query} = req.params;
    console.log(query)
})
router.post('/post',(req,res)=>{
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
        res.status(200).json({
            status:"Saved",
            updated:docs
        })
        })
    }catch(error){
        res.status(400).json({
            error:error,
            message:"Some Error There"
        })
    }
});
router.put('/update/:PostID/sallary/',(req,res)=>{
    try{
        let {postId} = req.params;

        let {sallary} = req.body;

        const { JobModel } = require("./../Models/User");
        console.log(sallary)
        JobModel.updateOne({_id:postId},{sallary:sallary},(err,docs)=>{
            if(err)
            res.status(400).json({
                message:"Failed to update Sallary"
            })
            else{
                res.status(200).json({
                    message:"Post SavedS"
                })
               
            }
        })

    }catch(error){
        res.status(400).json({
            message:"Some Error There"
        })
    }
})
module.exports = router;
