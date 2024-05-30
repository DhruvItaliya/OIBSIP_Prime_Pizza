import * as pizzaService from '../services/pizzaService.js';

export const addBase = async(req,res)=>{
    try {
        const base = await pizzaService.addBase(req);
        res.status(201).json({success:true,base});
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({success:false,error:error.message});
        }
        else{
            res.status(500).json({success:false,error:"Internal server Error"});
        }
    }
}

export const fetchBases = async(req,res)=>{
    try{
        const bases = await pizzaService.fetchBases();
        res.status(200).json({success:true,bases});
    }
    catch(error){
        console.log("Error in fetch bases");
        if(error instanceof Error){
            res.status(400).json({success:false,error:error.message});
        }
        else{
            res.status(500).json({success:false,error:"Internal server Error"});
        }
    }
}

export const addTopping = async(req,res)=>{
    try {
        const topping = await pizzaService.addTopping(req);
        res.status(201).json({success:true,topping});
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({success:false,error:error.message});
        }
        else{
            res.status(500).json({success:false,error:"Internal server Error"});
        }
    }
}
export const createPizza = async(req,res)=>{
    try {
        const pizza = await pizzaService.createPizza(req);
        res.status(201).json({success:true,pizza});
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({success:false,error:error.message});
        }
        else{
            res.status(500).json({success:false,error:"Internal server Error"});
        }
    }
}

export const newLaunches = async(req,res)=>{
    try{
        const new_launch = await pizzaService.newLaunches();
        res.status(200).json({success:true,new_launch});
    }
    catch(error){
        console.log("Error in new launches");
        if(error instanceof Error){
            res.status(400).json({success:false,error:error.message});
        }
        else{
            res.status(500).json({success:false,error:"Internal server Error"});
        }
    }
}

export const deletePizza = async(req,res)=>{
    try {
        const {id} = req.params;
        const pizza = await pizzaService.deletePizza(id);
        res.status(200).json({success:true,pizza});
    } catch (error) {
        if(error instanceof Error){
            res.status(401).json({success:false,error:error.message});
        }
        else{
            res.status(500).json({success:false,error:"Internal server Error"});
        }
    }
}

export const searchPizza = async(req,res)=>{
    try {
        const {keyword} = req.query;
        const pizza = await pizzaService.searchFood(keyword);
        res.status(200).json({success:true,pizza});
    } catch (error) {
        if(error instanceof Error){
            res.status(401).json({success:false,error:error.message});
        }
        else{
            res.status(500).json({success:false,error:"Internal server Error"});
        }
    }
}

export const fetch_all_pizza = async(req,res)=>{
    try{
        console.log("In pizza controller");
        const pizzas = await pizzaService.fetch_all_pizza();
        res.status(200).json({success:true,pizzas});
    }
    catch(error){
        console.log("Error in new launches");
        if(error instanceof Error){
            res.status(400).json({success:false,error:error.message});
        }
        else{
            res.status(500).json({success:false,error:"Internal server Error"});
        }
    }
}
