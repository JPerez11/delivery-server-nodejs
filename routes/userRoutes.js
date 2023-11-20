const userController = require('../controllers/userController');
module.exports=(app)=>{
    app.get('/api/users/getAll',userController.getAll);
    app.get('/api/users/find-by-email/:email',userController.findByEmail);
    app.get('/api/users/find-by-phone/:phone',userController.findByPhone);
    app.post('/api/users/register',userController.register);
    app.post('/api/users/login',userController.login);
};