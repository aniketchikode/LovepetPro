const db = require('../config/db.config.js');
const config = require('../config/config.js');

const Servicecategory = db.servicecategory;
const Service = db.service;
const Tips = db.tips;
const Login = db.login;
const Pet = db.pet;
const Loyalty = db.loyalty;


// API for Add Service Category 
exports.AddServiceCategory=(req,res)=>{ 

    Servicecategory.create({ 
        Category:req.body.Category,

    }).then((service) => {

        res.status(200).json({

            success: '200',
            message:'Category Added Successfully',
        })
    })


}



// API for Add Services 
exports.AddServices=(req,res)=>{ 

    if (!req.body.UserId) {
        return res.status(401).json({ message: ' Your request UserId is missing. ' });
    }
    if (!req.body.ServiceName) {
        return res.status(401).json({ message: ' Your request ServiceName is missing. ' });
    }
    if (!req.body.Category) {
        return res.status(401).json({ message: ' Your request Category is missing. ' });
    }
    if (!req.body.Price) {
        return res.status(401).json({ message: ' Your request Price is missing. ' });
    }
    if (!req.body.Description) {
        return res.status(401).json({ message: ' Your request Description is missing. ' });
    }

    var discount = req.body.Discount
    var disprice = req.body.Price - (req.body.Price * discount / 100)

    Service.create({ 
        VetId:req.body.UserId,
        ServiceName:req.body.ServiceName,
        Category:req.body.Category,
        Price:req.body.Price,
        Description:req.body.Description, 
        Discount:req.body.Discount, 
        DiscountPrice: disprice, 
        ServiceImage:"http://" + req.headers.host +"/" +req.file.filename,


    }).then((data) => {

        res.status(200).json({

            success: '200',
            message:'Service Added Successfully',
            serviceImage: data.ServiceImage
        })
    })


}




// API for Edit Services 
exports.EditServices=(req,res)=>{ 

    if (!req.body.id) {
        return res.status(401).json({ message: ' Your request id is missing. ' });
    }
    if (!req.body.ServiceName) {
        return res.status(401).json({ message: ' Your request ServiceName is missing. ' });
    }
    if (!req.body.Category) {
        return res.status(401).json({ message: ' Your request Category is missing. ' });
    }
    if (!req.body.Price) {
        return res.status(401).json({ message: ' Your request Price is missing. ' });
    }
    if (!req.body.Description) {
        return res.status(401).json({ message: ' Your request Description is missing. ' });
    }

    if(req.file){
		Service.update({ServiceImage:"http://" + req.headers.host +"/" +req.file.filename },
			{ where: { id: req.body.id } })
	}

    var discount = req.body.Discount
    var disprice = req.body.Price - (req.body.Price * discount / 100)

    if(req.body){

    Service.update({ 
        ServiceName:req.body.ServiceName,
        Category:req.body.Category,
        Price:req.body.Price,
        Description:req.body.Description, 
        Discount:req.body.Discount, 
        DiscountPrice: disprice

    },{ where: { id: req.body.id } }).then(async(pro) => {

        var serve =await Service.findOne({where:{id: req.body.id}})

        res.status(200).json({

            success: '200',
            message:'Product Edited Successfully',
            serviceImage: serve.ServiceImage
        })
    })

    }

}



// API for Delete Service  
exports.DeleteServices=(req,res)=>{ 

    if (!req.body.id) {
        return res.status(401).json({ message: ' Your request id is missing. ' });
    }
    
	Service.destroy({where: {id: req.body.id}})
	.then((data) => {

		res.status(200).json({

			success: '200',
			message: 'Deleted Successfully.',

		});


	})

}


// API for Show Services 
exports.GetServices=(req,res)=>{ 


    Service.findAll({where: { Category: req.body.Category }
    }).then(data => {

        res.status(200).json({

            success: '200',
            message:'Service Details',
            Servicedetails: data
        })


    })

}


// API for Add Tips 
exports.AddTips=(req,res)=>{ 

    if (!req.body.UserId) {
        return res.status(401).json({ message: ' Your request UserId is missing. ' });
    }
    if (!req.body.Titel) {
        return res.status(401).json({ message: ' Your request Titel is missing. ' });
    }
    if (!req.body.Discription) {
        return res.status(401).json({ message: ' Your request Discription is missing. ' });
    }

    Tips.create({ 
        VetId:req.body.UserId,
        Titel:req.body.Titel,
        Discription:req.body.Discription, 

    }).then((data) => {

        res.status(200).json({

            success: '200',
            message:'Tip Added Successfully',
            tips: data
        })
    })

}


// API for Get All Tips 
exports.GetAllTips=(req,res)=>{ 


    Pet.findOne({where: { UserId: req.params.UserId }
    }).then(async data => {

        var tips =await Tips.findAll({where:{VetId: data.VetId}})

        res.status(200).json({

            success: '200',
            message:'Vet Tips',
            tips: tips
        })


    })


}


// API for Add Loyalty Details 
exports.AddLoyalty=(req,res)=>{ 

    if (!req.body.UserId) {
        return res.status(401).json({ message: ' Your request UserId is missing. ' });
    }
    if (!req.body.Discription) {
        return res.status(401).json({ message: ' Your request Discription is missing. ' });
    }

    Loyalty.create({ 
        VetId:req.body.UserId,
        Discription:req.body.Discription, 
        Image:"http://" + req.headers.host +"/" +req.file.filename,

    }).then((data) => {

        res.status(200).json({

            success: '200',
            message:'Added Successfully',
            Ldata: data
        })
    })

}


// API for Update Loyalty Details 
exports.UpdateLoyalty=(req,res)=>{ 


    if (!req.body.id) {
        return res.status(401).json({ message: ' Your request id is missing. ' });
    }
    if (!req.body.UserId) {
        return res.status(401).json({ message: ' Your request UserId is missing. ' });
    }
    if (!req.body.Discription) {
        return res.status(401).json({ message: ' Your request Discription is missing. ' });
    }

    if(req.file){
		Loyalty.update({Image:"http://" + req.headers.host +"/" +req.file.filename },
			{ where: { id: req.body.id } })
	}

    if (req.body) {

        Loyalty.update({
            VetId:req.body.UserId,
            Discription:req.body.Discription,     

        }, { where: { id: req.body.id } }).then(async (pro) => {

            var data = await Loyalty.findOne({ where: { id: req.body.id } })

            res.status(200).json({

                success: '200',
                message: 'updated Successfully',
                image: data.ServiceImage
            })
        })

    }

}


// API for Get Loyalty details
exports.GetLoyalty=(req,res)=>{ 

    Pet.findOne({where: { UserId: req.params.UserId }
    }).then(async data => {

        var Ldata =await Loyalty.findAll({where:{VetId: data.VetId}})

        res.status(200).json({

            success: '200',
            message:'Loyalty details',
            data: Ldata
        })

    })

}


// API for Delete Loyalty  
exports.DeleteLoyalty=(req,res)=>{ 

    if (!req.body.id) {
        return res.status(401).json({ message: ' Your request id is missing. ' });
    }
    
	Loyalty.destroy({where: {id: req.body.id}})
	.then((user) => {

		res.status(200).json({

			success: '200',
			message: 'Deleted Successfully.',

		});

	})

}
