const Role = require("../helpers/role");
const { User } = require("../db.js");
//
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require('../../config.json');
//
module.exports = {
  getById,
  getByMyId,
  login
};

//GetById (ADMINS)
function getById(req, res, next) {
  const currentUser = req.user;
  const id = parseInt(req.params.id);
  //Si el rol no es igual a admin = Unauthorized
  if (currentUser.role !== Role.Admin) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  User.findByPk(id).then((user) => {
    return res.status(200).json(user);
  });
}

//GetByMyId (USERS)
function getByMyId(req, res, next) {
  // Traer ID del usuario que se encuentra dentro del token
  const { userId } = req.user;

  // Buscar usuario
  User.findOne({
    attributes: ['id', 'name', 'email', 'address', 'phoneNumber', 'image', 'role'],
    where: {
      id: userId
    }
  })
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch(error => next(error.message))
}

//Login (GUEST)
function login(req, res, next) {
  //Pedir los params pasados por Req
  var email = req.body.email.toLowerCase();
  var password = req.body.password;

  User.findOne({
    where: {
      email: email,
    },
  })
    .then((user) => {

      //Comparar el password que trae el request con el password del objeto user
      bcrypt.compare(password, user.dataValues.password, (error, response) => {

        if (error) {
          next(error.message);
        }

        if (response) {
          /*
          *Definir el token y guardar en el, tanto el id como el role del usuario (modificar si es necesario traer otros params) Esto sirve para no tener que hacer tanta logica
          *en redux solo para verificar al user cada vez que accede a una acción, en el futuro solo guardando el token y pasandoselo al back a traves de bearer podemos verificar
          *el usuario sin tener que guardarlo en un estado e ir modificandolo
          */
          var token = jwt.sign(
            {
              userId: user.id,
              role: user.role,
            },
            config.secret,
            {
              expiresIn: 60 * 60 * 24, // expires in 24 hours
            }
          );
          return res.status(200).json({ token });
        } else {
          return res.status(404).json({
            error: "email o contraseña invalidos"
          });
        }
      });
    })
    .catch((err) => {
      return res.status(404).json({
        error: "email o contraseña invalidos"
      });
    });
}
