const db = require('../config/db.config.js');
const config = require('../config/config.js');

const nodeMailer = require('nodemailer');
var generator = require('generate-password');
var randomize = require('randomatic');

const Login = db.login;
const Pet = db.pet;
const Vet = db.vet;


// API for Login
exports.Login=(req,res)=>{ 
	if (!req.body.Role) {
		return res.status(401).json({ message: ' Your request Role is missing details. ' });
	} 

	if (!req.body.UserId) {
		return res.status(401).json({ message: ' Your request UserId is missing details. ' });
	} 
	if (!req.body.Password) {
		return res.status(401).json({ message: 'Your request Password is missing details.' });
	}

	Login.findOne({ where: { UserId: req.body.UserId, Role:req.body.Role, } }).then(user => {
		if (!user) {

			return res.status(401).json({
				success: '404',
				message: 'Unauthorized Access'
			});
		} else {


			Login.findOne({where: { UserId: req.body.UserId }
			}).then(user => {
				if (!user) {
					return res.status(401).json({
						success: '404',
						message: 'Unauthorized Access,Enter Correct UserID And Password'
					});
				}
				
				if (req.body.Password == user.Password) {

				const userid = user.userid;
				const jwt = require('jsonwebtoken');
				const JWTToken1 = jwt.sign({ UserId: user.UserId, id: user.id }, config.secret, {
				});
				const uid = user.id;
				console.log(uid)
				console.log("save")
				// const jwttokon = new JWTToken({
				// 	UserId: uid,
				// 	Status: true,
				// 	Token: JWTToken1,

				// });
				
				// jwttokon.save().then(function (result) {
					res.status(200).json({

						success: '200',
						message: 'Welcome To The Application',
						id: uid,
						token: JWTToken1,
						userid:user.UserId,
						name:user.Name,
						Role: user.Role
					});


				// })	
				
				} else {

					console.log("wrong pass")
					return res.status(401).json({
					success: '404',
					message: 'Wrong Password',

					});

				}

				
			}).catch(err => {
				res.status(500).send('Error -> ' + err);
			});


		}
	});


}


// API for Forgot Password
exports.Forgotpassword = (req, res) => {

	if (!req.body.Email) {
		return res.status(401).json({ message: ' Your request Email Id is missing details. ' });
	} 

	Login.findOne({ where: { Email: req.body.Email } }).then(function (user) {

		
		if (user) {
			var useremail= user.Email
			var password = generator.generate({
				length: 5,
				numbers: true
			});
			// let hash = bcrypt.hashSync(password, 10);

			let transporter = nodeMailer.createTransport({
				host: 'smtp.gmail.com',
				port: 465,
				secure: true,
				auth: {
					user: '',
					pass: ''
				}
				});
				let mailOptions = {
				from: 'Rajyug', // sender address
				to: useremail, 
				subject: 'Email From Admin Application ✔',

				text: 'Your Password', // plain text bdy
				html: 'Dear User Your Password is ='+password
				};
				transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					return console.log(error);
				}
				console.log('Message %s sent: %s', info.messageId, info.response);
				});

				res.status(200).json({success: '200',message: 'Password is sent to your Email'});

				Login.update({ Password: password },
					{ where: { Email: req.body.Email } }
				).then((user) => {
				});

		}
		else{res.status(401).json({message: 'Email Id is Not Correct'});}
	})
}


// API for Reset Password
exports.Resetpassword = (req, res) => {

	
	if (!req.body.UserId) {
	  return res.status(401).json({message: ' Your request UserID is missing. ' });
	}
	if (!req.body.CurrentPassword) {
	  return res.status(401).json({message: ' Your request Current Password is missing. ' });
	}
	if (!req.body.NewPassword) {
		return res.status(401).json({message: ' Your request New Password is missing. ' });
    }
	if (!req.body.ConfirmPassword) {
		return res.status(401).json({message: ' Your request Confirm Password is missing. ' });
	}

	Login.findOne({ where: { UserId: req.body.UserId } }).then(function (user) {
  
	  if (user) {

		if(user.Password==req.body.CurrentPassword)
		{
			if(req.body.NewPassword==req.body.ConfirmPassword)
			{
				Login.update({ Password: req.body.ConfirmPassword },
					{ where: { UserId: req.body.UserId } }
				).then((user) => {
					res.status(200).json({
						success: '200',
						message: 'Password Changed successfully.'
					});
				});
			}else {
				res.status(200).json({success: '404', message: "New and Confirm Password is not matching"});
			  }	

		}else {
			res.status(200).json({success: '404', message: "Current Password is Incorrect"});
		  }
	  } else {
		res.status(200).json({
		  success: '404',
		  message: "UserID is  not valid"
		});
	  }
	})
	
  };  



  // API for Add Customer
exports.AddNewCustomer = (req, res) => {

	if (!req.body.UserId) {
        return res.status(401).json({ message: ' Your request UserId is missing. ' });
    }
	if (!req.body.Name) {
        return res.status(401).json({ message: ' Your request Name is missing. ' });
    }
    if (!req.body.MobileNo) {
        return res.status(401).json({ message: ' Your request MobileNo is missing. ' });
    }
    if (!req.body.Email) {
        return res.status(401).json({ message: ' Your request Email is missing. ' });
	}
	
	const EmailToValidate = req.body.Email;
	const EmailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	const mailcheck = EmailRegexp.test(EmailToValidate);
	if (!mailcheck) {
	  console.log(EmailToValidate);
	  return res.status(500).json({ message: 'Please Enter A Correct Email like abc@example.com'});
	}
	const mobileno = req.body.MobileNo;
	// const regExp = /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/;
	const regExp =  /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
    const phone = regExp.test(mobileno);
    if (!phone) {
     
      return res.status(500).json({message: ' mobile no is not valid'});
	}

	Pet.findOne({where: {  Email:req.body.Email, MobileNo:req.body.MobileNo }
	}).then(user => {

	if(!user){

		var password = generator.generate({
			length: 5,
			numbers: true
		});

		Login.create({ UserId: randomize('A0',4),
					   Name:req.body.Name,
				       Password:password,
				       Role:'PET'

    	}).then(async(pet) => {

			var user = await Pet.create({ 		
				VetId: req.body.UserId,
				Name:req.body.Name,
				MobileNo:req.body.MobileNo,
				Email:req.body.Email,
				UserId: pet.UserId,
				Role: pet.Role
			 })

        	res.status(200).json({

         	    success: '200',
        	    message:'Customer Added Successfully',
        	})
    	})

		} else { return res.status(500).json({success:'500', message: "User is already present" }); }

	})



}



  // API for Get Users Profile
exports.GetUserProfile = (req, res) => {

	if (!req.params.UserId) {
        return res.status(401).json({ message: ' Your request UserId is missing. ' });
	}
	
	Pet.findOne({where: { UserId: req.params.UserId }
	}).then(pet => {

		res.status(200).json({

			success: '200',
			Data: pet
		});
	})


}


  // API for Get VET Profile
  exports.GetVetProfile = (req, res) => {

	if (!req.params.UserId) {
        return res.status(401).json({ message: ' Your request UserId is missing. ' });
	}
	
	Vet.findOne({where: { UserId: req.params.UserId }
	}).then(vet => {
		
		res.status(200).json({

			success: '200',
			Data: vet
		});
	})


}