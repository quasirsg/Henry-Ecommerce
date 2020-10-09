const server = require("express").Router();
const { Category } = require("../db.js");

server.get("/", (req, res, next) => {
  Category.findAll()
    .then((category) => {
      if (category === null)
        return res.status(404).send({ message: "No hay categorias" });

      return res.status(200).send({ category });
    })
    .catch(next);
});

server.post("/", (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).send("a parameter is missing");

  Category.create({
    name: name,
  })
    .then((category) => {
      return res.status(200).json(category);
    })
    .catch(next);
});

server.put("/:id", (req, res, next) => {
  let { id } = req.params;
  let update = req.body;

  Category.findOne({ where: { id } })
    .then((category) => {
      if (!category) {
        return res.status(404).json({ message: "Category doesnt exist" });
      }
      category.update(update).then((categoryUpdate) => {
        return res.status(200).json(categoryUpdate);
      });
    })
    .catch(next);
});

server.delete("/:id", (req, res, next) => {
  let { id } = req.params;

  Category.findOne({ where: { id } })
    .then((category) => {
      if (!category)
        return res.status(404).json({ message: "Category doesnt exist" });

      category.destroy(category).then(() => {
        return res.status(200).json("Category deleted");
      });
    })
    .catch(next);
});

module.exports = server;
