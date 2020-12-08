
const multer = require('multer');

module.exports = function (app) {


    const users = require('../controller/user.controller.js');
    const pet = require('../controller/pet.controller.js');
    const vet = require('../controller/vet.controller.js');
    const service = require('../controller/service.controller.js');


    const path = require('path');
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './public/images')
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
      }
    })
    var upload = multer({ storage: storage })
    


    app.post('/api/Login', users.Login);
    app.post('/api/Forgotpassword',users.Forgotpassword)
    app.post('/api/Resetpassword',users.Resetpassword)
    app.post('/api/AddNewCustomer',users.AddNewCustomer)
    app.get('/api/GetUserProfile/:UserId',users.GetUserProfile)
    app.get('/api/GetVetProfile/:UserId',users.GetVetProfile)


    app.post('/api/AddPet',upload.single('myFile'),pet.AddPet)
    app.patch('/api/EditPet',upload.single('myFile'),pet.EditPet)
    app.post('/api/GetUsersPet',pet.GetUsersPet)
    app.delete('/api/DeletePet',pet.DeletePet)
    app.post('/api/AddMattingPet',pet.AddMattingPet)


    app.post('/api/AddProducts',upload.single('myFile'),vet.AddProducts)
    app.patch('/api/EditProducts',upload.single('myFile'),vet.EditProducts)
    app.post('/api/GetProducts',vet.GetProducts)
    app.post('/api/GetSlots',vet.GetSlots)
    app.post('/api/BookAppointment',vet.BookAppointment)
    app.post('/api/UpcomingAppointmentVet',vet.UpcomingAppointmentVet)
    app.post('/api/AddProductCategory',vet.AddProductCategory)
    app.delete('/api/DeleteProduct',vet.DeleteProduct)
    app.post('/api/AddVaccine',vet.AddVaccine)
    app.get('/api/MattingRequest/:UserId',vet.MattingRequest)


    app.post('/api/AddServiceCategory',service.AddServiceCategory)
    app.post('/api/AddServices',upload.single('myFile'),service.AddServices)
    app.patch('/api/EditServices',upload.single('myFile'),service.EditServices)
    app.delete('/api/DeleteServices',service.DeleteServices)
    app.post('/api/GetServices',service.GetServices)
    app.post('/api/AddTips',service.AddTips)
    app.get('/api/GetAllTips/:UserId',service.GetAllTips)
    app.post('/api/AddLoyalty',upload.single('myFile'),service.AddLoyalty)
    app.patch('/api/UpdateLoyalty',upload.single('myFile'),service.UpdateLoyalty)
    app.get('/api/GetLoyalty/:UserId',service.GetLoyalty)
    app.delete('/api/DeleteLoyalty',service.DeleteLoyalty)

}
