const categoryModel = require("../models/category.model");


const createCategory = async(req, res)=>{
    try{
        let {title} = req.body;

        // checking api req body is okay or not.
        if(!title){
           return res.status(422).json("Enter Title name.");
        }

        // already exists or not.
        const isExist = await categoryModel.findOne({title});
        if(isExist){
            return res.status(422).json("Already exists catagory.");
        }

        // created categories
        const newCategory = await categoryModel.create({title});
        res.status(201).json(newCategory);

    }catch(error){
        res.status(500).json({ Message: error.message });
    }
}


const allCategory = async(req, res) =>{
    try{
        const allCategory = await categoryModel.find({})
        res.status(200).json(allCategory);

    }catch(error){
        res.status(500).json({ Message: error.message });
    }
}

const updateCategory = async(req, res) =>{
    try{
        let {title} = req.body;
        const categoryId = req.params.id;

        // checking api req body is okay or not.
        if(!title){
            return res.status(422).json("Enter Title name.");
         }
 
         // already exists or not.
         const isExist = await categoryModel.findOne({title});
         if(isExist){
             return res.status(422).json("Already exists catagory.");
         }

         const newUpdateCategory = await categoryModel.findByIdAndUpdate(categoryId, {title});
         res.status(200).json("Catagory updated.");

    }catch(error){
        res.status(500).json({ Message: error.message });
    }
}




module.exports = {
    createCategory,
    updateCategory,
    allCategory
};