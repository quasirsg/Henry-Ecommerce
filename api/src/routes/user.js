const server = require("express").Router();
const { User } = require("../db.js");

server.get("/", (req, res, next) => {
  User.findAll({
    attributes: ["id", "name", "email", "img", "rol"]
    // include: {
    //   attributes: ["name"],
    //   model: Category,
    //   as: "categories",
    //   through: {
    //     attributes: ["category_id"],
    //   },
    // },
  })
    .then((users) => {
      return res.status(200).json({ users});
    })
    .catch(next);
});

server.post("/", (req, res, next) => {
  const { name, email, password, image, location_id, rol } = req.body;

  if (!name || !email || !password || !image || !location_id || !rol)
    return res.status(400).json({ message: "A parameter is missing" });

  User.create({
    name,
    email,
    password,
    image,
    location_id,
    rol,
  })
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch(next);
});

server.put("/:id", (req, res, next) => {
  let { id } = req.params;
  let update = req.body;
  //No permitir actualizar ciertos parametros
  //   delete update.email;
  //   delete update.rol;

  User.findOne({ where: { id } })
    .then((user) => {
      if (!user) return res.status(404).json({ message: "User doesnt exist" });

      user.update(update).then((userUpdate) => {
        return res.status(200).json(userUpdate);
      });
    })
    .catch(next);
});

server.delete("/:id", (req, res, next) => {
  let { id } = req.params;

  User.findOne({ where: { id } })
    .then((user) => {
      if (!user)
        return res.status(404).json({ message: "User doesnt exist" });

        user.destroy(user).then(() => {
        return res.status(200).json({ message: "User deleted" });
      });
    })
    .catch(next);
});

module.exports = server;
