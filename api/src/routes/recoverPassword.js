require("dotenv").config();

const server = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  RESET_PASSWORD_KEY,
  CLIENT_URL,
  APIKEY_MAILGUN,
  DOMAIN_MAILGUN,
} = process.env;
const mailgun = require("mailgun-js")({
  apiKey: APIKEY_MAILGUN,
  domain: DOMAIN_MAILGUN,
});
const { User } = require("../db");
// const

// Forgot Password
server.put("/auth/forgot-password", (req, res, next) => {
  const { email } = req.body;
  // Buscar user en la BD
  console.log(email);
  User.findOne({
    where: {
      email,
    },
  })
    .then((user) => {
      // El user no existe
      if (!user) {
        return res.status(400).json({
          error: `No existe un usuario con el mail: ${email}`,
        });
      }

      // Usuario verificado, generar el token
      const token = jwt.sign(
        {
          id: user.id,
        },
        RESET_PASSWORD_KEY,
        { expiresIn: "20m" }
      );

      // Actualizar usuario y agregar token dentro del campo 'resetLink'
      User.update(
        {
          resetLink: token,
        },
        {
          where: {
            id: user.id,
          },
        }
      ).then((userUpdated) => {
        // Verificar que se actualice el usuario
        if (!userUpdated[0]) {
          return res.status(400).json({
            error: "No se guardo token para resetear password del usuario.",
          });
        } else {
          // Generar mensaje
          const data = {
            from: "FitnessApp <me@samples.mailgun.org>",
            to: `${email}`,
            subject: "Recuperar contraseña del usuario",
            template: "forgot-password",
            "h:X-Mailgun-Variables": JSON.stringify({
              url_forgot_password: `${CLIENT_URL}/resetpassword/${token}`,
            }),
          };

          // Token guardado (User actualizado) , enviar correo al email
          mailgun.messages().send(data, (error, body) => {
            if (error) {
              return res.status(500).json({
                error: error.message,
              });
            }

            // Correo enviado al email del user
            return res.status(200).json({
              message: `Se envió un mensaje al correo del usuario: ${user.name}.`,
            });
          });
        }
      });
    })
    .catch((error) => next(error.message));
});

// Reset password
server.put("/auth/reset-password", (req, res, next) => {
  const { resetLink, newPassword } = req.body;

  // Verificar que el token exista en el body
  if (resetLink) {
    // Verificar token
    jwt.verify(resetLink, RESET_PASSWORD_KEY, (error, payload) => {
      if (error) {
        return res.status(401).json({
          error: "Token no válido o expirado.",
        });
      }

      // Verificar que el usuario exista con el 'token' (resetLink) en la BD
      User.findOne({
        where: {
          resetLink,
        },
      })
        .then((user) => {
          if (!user) {
            return res.status(400).json({
              error: "No existe un usuario con este token.",
            });
          }

          // El usuario existe , cambiar contraseña y eliminar token
          User.update(
            {
              password: bcrypt.hashSync(newPassword, 10),
              resetLink: "",
            },
            {
              where: {
                id: payload.id,
              },
            }
          ).then((userUpdated) => {
            if (!userUpdated[0]) {
              return res.status(400).json({
                error: "Error al cambiar tu password.",
              });
            }

            // Se actualizo la password del usuario
            return res.status(200).json({
              message: `¡${user.name} has cambiado tu contraseña! Ya puedes iniciar sesión..`,
            });
          });
        })
        .catch((error) => next(error.message));
    });
  } else {
    return res.status(401).json({
      error: "Error de autenticación , token no enviado",
    });
  }
});

module.exports = server;
