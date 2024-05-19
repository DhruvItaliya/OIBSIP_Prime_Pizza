import { Router } from "express";
const router = Router();

router.get('',async(req,res)=>{
    console.log("Welcome to home page of Prime-Pizza");
    res.status(200).json({success:true,message:"Welcome!"});
});

export default router;