const req = require("express/lib/request");
const User = require("../models/user");
const encrypter = require("../config/encrypter");
const jwt = require("jsonwebtoken");
const key = require("../config/key");

module.exports = {
  async getAll(req, res, next) {
    try {
      const data = await User.getAll();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(501).json({
        error,
        success: false,
        message: "error al recuperar los usuarios",
      });
    }
  },
  async findByEmail(req, res, next) {
    let email = req.params.email;
    try {
      const data = await User.findByEmail(email);
      if (data === null) {
        return res.status(404).json({
          success: false,
          message: `No existe un usuario con el correo ${email}`,
          data: data,
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Usuario encontrado',
        data: data,
      })
    } catch (error) {
      return res.status(501).json({
        error,
        success: false,
        message: "error al recuperar al usuario",
      });
    }
  },
  async findByPhone(req, res, next) {
    let phone = req.params.phone;
    try {
      const data = await User.findByPhone(phone);
      if (data === null) {
        return res.status(404).json({
          success: false,
          message: `No existe un usuario con el telefono ${phone}`,
          data: data,
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Usuario encontrado',
        data: data,
      })
    } catch (error) {
      return res.status(501).json({
        error,
        success: false,
        message: "error al recuperar al usuario",
      });
    }
  },
  async register(req, res, next) {
    try {
      const user = req.body;
      user.password = encrypter.encrypt(user.password);

      const data = await User.create(user);
      return res.status(201).json({
        success: true,
        message: "El registro fue insertado",
        data: data.id,
      });
    } catch (error) {
      return res.status(501).json({
        error,
        success: false,
        message: "error al registrar usuario",
      });
    }
  },
  async login(req, res, next) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const myUser = await User.findByEmail(email);
      console.log(myUser);

      if (!myUser) {
        return res.status(401).json({
          success: false,
          message: "el usuario no fue encontrado",
        });
      }

      if (encrypter.isPasswordMatched(password, myUser.password)) {
        const token = jwt.sign(
          {
            id: myUser.id,
            email: myUser.email,
          },
          key.secretKey
        );
        const data = {
          id: myUser.id,
          email: myUser.email,
          name: myUser.name,
          lastname: myUser.lastname,
          phone: myUser.phone,
          image: myUser.image,
          session_token: `JWT ${token}`,
        };
        return res.status(201).json({
          success: true,
          data: data,
        });
      }

      return res.status(401).json({
        success: false,
        message: "La contraseña es incorrecta",
      });
    } catch (error) {
      return res.status(501).json({
        error,
        success: false,
        message: "error al recuperar los usuarios",
      });
    }
  },
};
