import Review from "../model/userModel.js";

export const create = async(req, res)=>{
    try {

        const userData = new Review(req.body);


        await userData.save();
        res.status(200).json({msg: "Review save sucesfully"});

    } catch (error) {
        res.status(500).json({error: error});
    }
}


export const getAll = async(req, res) =>{
    try {

        const userData = await Review.find();
       
        res.status(200).json(userData);
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


export const getOne = async(req, res) =>{
    try {

        const id = req.params.id;
        const userExist = await Review.findById(id);
       
        res.status(200).json(userExist);
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


export const update = async(req, res) =>{
    try {

        const id = req.params.id;
        const userExist = await Review.findById(id);
        

        const updatedData = await Review.findByIdAndUpdate(id, req.body, {new:true});
        res.status(200).json({msg: "Review updated successfully"});
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const deleteUser = async(req, res) =>{
    try {

        const id = req.params.id;
        const userExist = await Review.findById(id);
       
        await Review.findByIdAndDelete(id);
        res.status(200).json({msg: "Review deleted successfully"});
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}