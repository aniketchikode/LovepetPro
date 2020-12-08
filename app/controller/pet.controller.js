const db = require('../config/db.config.js');
const config = require('../config/config.js');
var randomize = require('randomatic');

// const User = db.users;
const Petdetails = db.petdetails;
const Pet = db.pet;
const Matting = db.matting;


// API for Add Pet 
exports.AddPet=(req,res)=>{ 

    if (!req.body.UserId) {
        return res.status(401).json({ message: ' Your request UserId is missing. ' });
    }
    if (!req.body.PetName) {
        return res.status(401).json({ message: ' Your request PetName is missing. ' });
    }
    if (!req.body.Breed) {
        return res.status(401).json({ message: ' Your request Breed is missing. ' });
    }
    if (!req.body.Diet) {
        return res.status(401).json({ message: ' Your request Diet is missing. ' });
    }
    if (!req.body.PetGender) {
        return res.status(401).json({ message: ' Your request PetGender is missing. ' });
    }
    if (!req.body.Age) {
        return res.status(401).json({ message: ' Your request Age street is missing. ' });
    }
    if (!req.body.OwnerName) {
        return res.status(401).json({ message: ' Your request OwnerName is missing. ' });
    }
    if (!req.body.OwnerContact) {
        return res.status(401).json({ message: ' Your request OwnerContact is missing. ' });
    }
    if (!req.body.Discription) {
        return res.status(401).json({ message: ' Your request Discription is missing. ' });
    }
    if (!req.body.Behavior) {
        return res.status(401).json({ message: ' Your request Behavior is missing. ' });
    }
    if (!req.body.LifeExpetance) {
        return res.status(401).json({ message: ' Your request LifeExpetance is missing. ' });
    }
    if (!req.body.Color) {
        return res.status(401).json({ message: ' Your request Color is missing. ' });
    }
    if (!req.body.Hight) {
        return res.status(401).json({ message: ' Your request Hight is missing. ' });
    }
    if (!req.body.Weight) {
        return res.status(401).json({ message: ' Your request Weight is missing. ' });
    }


    const mobileno = req.body.OwnerContact;
	const regExp =  /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
    const phone = regExp.test(mobileno);
    if (!phone) {
     
      return res.status(500).json({message: 'Owner mobile no is not valid'});
    }
    
    var userD = Pet.findOne({where: { UserId:req.body.UserId }})
    var fistname= userD.Name.split(' ')[0]

    Petdetails.create({ PetId: fistname+randomize('A0',4),
                      UserId:req.body.UserId,
                      PetName:req.body.PetName,
                      Segment:req.body.Segment,
					  Breed:req.body.Breed,
					  Diet:req.body.Diet,
					  PetGender:req.body.PetGender, 
					  Age: req.body.Age,
                      OwnerName:req.body.OwnerName,
                      OwnerContact:req.body.OwnerContact,
                      Discription:req.body.Discription,
					  Behavior:req.body.Behavior,
                      LifeExpetance:req.body.LifeExpetance,
                      Color:req.body.Color,
					  Hight:req.body.Hight,
					  Weight:req.body.Weight,
					  PetImage:"http://" + req.headers.host +"/" +req.file.filename,


        }).then((pet) => {

			res.status(200).json({

				success: '200',
                message:'Pet Added Successfully',
                PetImage: pet.PetImage
            })
        })

}



// API for Edit Pet 
exports.EditPet=(req,res)=>{ 

    if (!req.body.id) {
        return res.status(401).json({ message: ' Your request id is missing. ' });
    }
    if (!req.body.PetName) {
        return res.status(401).json({ message: ' Your request PetName is missing. ' });
    }
    if (!req.body.Breed) {
        return res.status(401).json({ message: ' Your request Breed is missing. ' });
    }
    if (!req.body.Diet) {
        return res.status(401).json({ message: ' Your request Diet is missing. ' });
    }
    if (!req.body.PetGender) {
        return res.status(401).json({ message: ' Your request PetGender is missing. ' });
    }
    if (!req.body.Age) {
        return res.status(401).json({ message: ' Your request Age street is missing. ' });
    }
    if (!req.body.OwnerName) {
        return res.status(401).json({ message: ' Your request OwnerName is missing. ' });
    }
    if (!req.body.OwnerContact) {
        return res.status(401).json({ message: ' Your request OwnerContact is missing. ' });
    }
    if (!req.body.Discription) {
        return res.status(401).json({ message: ' Your request Discription is missing. ' });
    }
    if (!req.body.Behavior) {
        return res.status(401).json({ message: ' Your request Behavior is missing. ' });
    }
    if (!req.body.LifeExpetance) {
        return res.status(401).json({ message: ' Your request LifeExpetance is missing. ' });
    }
    if (!req.body.Color) {
        return res.status(401).json({ message: ' Your request Color is missing. ' });
    }
    if (!req.body.Hight) {
        return res.status(401).json({ message: ' Your request Hight is missing. ' });
    }
    if (!req.body.Weight) {
        return res.status(401).json({ message: ' Your request Weight is missing. ' });
    }

    const mobileno = req.body.OwnerContact;
	const regExp =  /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
    const phone = regExp.test(mobileno);
    if (!phone) {
     
      return res.status(500).json({message: 'Owner mobile no is not valid'});
    }


    if(req.file){
		Petdetails.update({ProfileImage:"http://" + req.headers.host +"/" +req.file.filename },
			{ where: { id: req.body.id } })
	}

    
	if(req.body){

    Petdetails.update({ 
                      PetName:req.body.PetName,
                      Segment:req.body.Segment,
					  Breed:req.body.Breed,
					  Diet:req.body.Diet,
					  PetGender:req.body.PetGender, 
					  Age: req.body.Age,
                      OwnerName:req.body.OwnerName,
                      OwnerContact:req.body.OwnerContact,
                      Discription:req.body.Discription,
					  Behavior:req.body.Behavior,
                      LifeExpetance:req.body.LifeExpetance,
                      Color:req.body.Color,
					  Hight:req.body.Hight,
					  Weight:req.body.Weight,
					  


        },{ where: { id: req.body.id } }).then(async(pet) => {

            var pets =await Petdetails.findOne({where:{id: req.body.id}})

			res.status(200).json({

				success: '200',
                message:'Pet Details Edited Successfully',
                PetImage: pets.PetImage
            })
        })
    }

}


// API for Show all users Pets 
exports.GetUsersPet=(req,res)=>{ 


    Petdetails.findAll({where: { UserId: req.body.UserId }
    }).then(user => {

        res.status(200).json({

            success: '200',
            message:'Pet Details',
            Petdetails: user
        })


    })

}


// API for Delete Pets details
exports.DeletePet=(req,res)=>{ 


    if (!req.body.id) {
        return res.status(401).json({ message: ' Your request id is missing. ' });
    }
    
	Petdetails.destroy({where: {id: req.body.id}})
	.then((user) => {

		res.status(200).json({

			success: '200',
			message: 'Deleted Successfully.',

		});


	})

}


// API for Add Pets for Matting
exports.AddMattingPet=async(req,res)=>{ 


    if (!req.body.UserId) {
        return res.status(401).json({ message: ' Your request UserId is missing. ' });
    }
    if (!req.body.PetId) {
        return res.status(401).json({ message: ' Your request PetId is missing. ' });
    }

    var Udata = await Pet.findOne({where:{UserId: req.body.UserId}})

    Matting.create({ 
        VetId: Udata.VetId,
        PetId:req.body.PetId, 

    }).then((data) => {

        res.status(200).json({

            success: '200',
            message:'Your request successfully sent to the vet ',
            Ldata: data
        })
    })


}