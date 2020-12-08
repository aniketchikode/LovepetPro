const db = require('../config/db.config.js');
const config = require('../config/config.js');
const sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
const Op = sequelize.Op;

const Petdetails = db.petdetails;
const Products = db.products;
const Slots = db.slots;
const Pet = db.pet;
const Vet = db.vet;
const Setappointment = db.setappointment;
const Bookappointment = db.bookappointment;
const Productcategory = db.productcategory;
const Vaccine = db.vaccine;
const Matting = db.matting;


// API for Add Product 
exports.AddProducts=(req,res)=>{ 

    if (!req.body.UserId) {
        return res.status(401).json({ message: ' Your request UserId is missing. ' });
    }
    if (!req.body.ProductName) {
        return res.status(401).json({ message: ' Your request ProductName is missing. ' });
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

    Products.create({ 
        VetId:req.body.UserId,
        ProductName:req.body.ProductName,
        Category:req.body.Category,
        Price:req.body.Price,
        Description:req.body.Description, 
        Discount:req.body.Discount, 
        DiscountPrice: disprice, 
        ProductImage:"http://" + req.headers.host +"/" +req.file.filename,


    }).then((pro) => {

        res.status(200).json({

            success: '200',
            message:'Product Added Successfully',
            productimage: pro.ProductImage
        })
    })


}




// API for Edit Product 
exports.EditProducts=(req,res)=>{ 

    if (!req.body.id) {
        return res.status(401).json({ message: ' Your request id is missing. ' });
    }
    if (!req.body.ProductName) {
        return res.status(401).json({ message: ' Your request ProductName is missing. ' });
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
		Products.update({ProductImage:"http://" + req.headers.host +"/" +req.file.filename },
			{ where: { id: req.body.id } })
	}

    var discount = req.body.Discount
    var disprice = req.body.Price - (req.body.Price * discount / 100)

    if(req.body){

    Products.update({ 
        ProductName:req.body.ProductName,
        Category:req.body.Category,
        Price:req.body.Price,
        Description:req.body.Description, 
        Discount:req.body.Discount, 
        DiscountPrice: disprice

    },{ where: { id: req.body.id } }).then(async(pro) => {

        var prod =await Products.findOne({where:{id: req.body.id}})

        res.status(200).json({

            success: '200',
            message:'Product Edited Successfully',
            productimage: prod.ProductImage
        })
    })

    }

}



// API for Show Products 
exports.GetProducts=(req,res)=>{ 


    Products.findAll({where: { Category: req.body.Category }
    }).then(pro => {

        res.status(200).json({

            success: '200',
            message:'Product Details',
            Productdetails: pro
        })


    })

}



// API for Add Product Category 
exports.AddProductCategory=(req,res)=>{ 

    Productcategory.create({ 
        Category:req.body.Category,

    }).then((pro) => {

        res.status(200).json({

            success: '200',
            message:'Category Added Successfully',
        })
    })


}


// API for Delete Product  
exports.DeleteProduct=(req,res)=>{ 

    if (!req.body.id) {
        return res.status(401).json({ message: ' Your request id is missing. ' });
    }
    
	Products.destroy({where: {id: req.body.id}})
	.then((user) => {

		res.status(200).json({

			success: '200',
			message: 'Deleted Successfully.',

		});


	})

}




// API for Show slots 
exports.GetSlots=async(req,res)=>{ 

    if (!req.body.UserId) {
        return res.status(401).json({ message: ' Your request UserId is missing. ' });
    }
    if (!req.body.Date) {
        return res.status(401).json({ message: ' Your request Date is missing. ' });
    }

    var ID=req.body.UserId
    const data = await db.sequelize.query("SELECT VetId FROM pets Where UserId = $UserId ", {
        bind: { UserId: ID },
        type: QueryTypes.SELECT
      });
      

    var data1 = await Setappointment.findOne({where:{VetId: data[0].VetId, Date: req.body.Date}})

      if(data1){

          var from = data1.TimeFrom
          var to = data1.TimeTo

          var data2 = await Slots.findOne({ where: { Slots: { [Op.startsWith]: from } } })
          var data3 = await Slots.findOne({ where: { Slots: { [Op.endsWith]: to } } })

          var formid = data2.id
          var toid = data3.id

          var data4 = await Slots.findAll({ where: { id: { [Op.between]: [formid, toid] } } })
          var data04 = JSON.parse(JSON.stringify(data4))

            for (var i = 0; i < data04.length; i++) {    

                var data5 = await Bookappointment.findAll({ where: { SlotId: data04[i].id, Date: req.body.Date} })

                console.log(data5.length > 5)
                if(data5.length >= 5){
                    data04[i].status = 'Full';
                }else{
                    data04[i].status = 'Open';
                }

            }
            return res.status(200).json({

                 success: '202',
                 message:'Open',
                 slots: data04
            })

      }else{

       return res.status(404).json({

            success: '404',
            message:'Not Open yet',
        })

      }

}



// API for Book Appointment 
exports.BookAppointment=async(req,res)=>{ 

    if (!req.body.UserId) {
        return res.status(401).json({ message: ' Your request UserId is missing. ' });
    }
    if (!req.body.Date) {
        return res.status(401).json({ message: ' Your request Date is missing. ' });
    }
    if (!req.body.SlotId) {
        return res.status(401).json({ message: ' Your request SlotId is missing. ' });
    }

    var Udata = await Pet.findOne({ where: { UserId: req.body.UserId} })

    var data = await Bookappointment.findOne({ where: { UserId: req.body.UserId, Date: req.body.Date} })

    if(data){
        return res.status(401).json({ message: ' Already Booked. '});
    }else{

        Bookappointment.create({
            UserId: req.body.UserId,
            Date: req.body.Date,
            SlotId: req.body.SlotId,
            VetId: Udata.VetId,

        }).then((pro) => {

            res.status(200).json({

                success: '200',
                message: 'Appointment Booked Successfully',
            })
        })
    }


}



// API for Upcoming Appointment for VET 
exports.UpcomingAppointmentVet=(req,res)=>{ 

    var now = new Date();
    var date = now.toISOString().split('T')[0];
    console.log(date)

    Bookappointment.findAll({where: { VetId: req.body.VetId, Date: date }
    }).then(async appoint => {

        var Appoint = JSON.parse(JSON.stringify(appoint))

        for (var i = 0; i < Appoint.length; i++) {    

            var appointment = await Pet.findAll({ where: { UserId: Appoint[i].UserId } })
            var app = JSON.parse(JSON.stringify(appointment))

            for (var j = 0; j < app.length; j++) {

                if (Appoint[i].UserId == app[j].UserId) {

                    Appoint[i].Name = app[j].Name;

                }
            }

        }
        res.status(200).json({

            success: '200',
            message:'Upcoming Appointments',
            appointment: Appoint
        })


    })


}



// API for Add Vaccine 
exports.AddVaccine=(req,res)=>{ 

    if (!req.body.UserId) {
        return res.status(401).json({ message: ' Your request UserId is missing. ' });
    }
    if (!req.body.PetId) {
        return res.status(401).json({ message: ' Your request PetId is missing. ' });
    }
    if (!req.body.VaccineName) {
        return res.status(401).json({ message: ' Your request VaccineName is missing. ' });
    }
    if (!req.body.Discription) {
        return res.status(401).json({ message: ' Your request Discription is missing. ' });
    }
    if (!req.body.Date) {
        return res.status(401).json({ message: ' Your request Date is missing. ' });
    }

    Vaccine.create({ 
        VetId:req.body.UserId,
        VaccineName:req.body.VaccineName,
        PetId:req.body.PetId,
        Description:req.body.Description, 
        Date:req.body.Date, 

    }).then((data) => {

        res.status(200).json({

            success: '200',
            message:'Vaccine Added Successfully',
            vaccine: data
        })
    })


}


// API for Matting Request by Customer 
exports.MattingRequest=(req,res)=>{ 


	if (!req.params.UserId) {
        return res.status(401).json({ message: ' Your request UserId is missing. ' });
	}
	
	Matting.findAll({where: { VetId: req.params.UserId }
	}).then(async data => {

        var matt = JSON.parse(JSON.stringify(data))

        for (var i = 0; i < matt.length; i++) {    

            var MattData = await Petdetails.findAll({ where: { PetId: matt[i].PetId } })

        }
		
		res.status(200).json({

            success: '200',
            message:'Matting Request',
			Data: MattData
		});
	})


}