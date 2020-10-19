const server = require("express").Router();
const { Category } = require("../db.js");

server.get("/", (req, res, next) => {
  Category.findAll({
    attributes: ["id", "name", "description"],
  })
    .then((category) => {
      if (category === null)
        return res.status(404).json({ message: "No hay categorias" });

      return res.status(200).json({ category });
    })
    .catch(next);
});

server.post("/", (req, res, next) => {
  const { name, description } = req.body;

  if (!name || !description)
    return res.status(400).json({ message: "A parameter is missing" });

  Category.create({
    name: name,
    description: description,
  })
    .then((category) => {
      return res.status(200).json(category);
    })
    .catch(next);
});

server.put("/:id", (req, res, next) => {
  let { id } = req.params;
  let currentCategory = req.body;

  Category.findOne({ where: { id } })
    .then((category) => {
      if (!category)
        return res.status(404).json({ message: "Category doesnt exist" });

      category.update(currentCategory).then((categoryUpdate) => {
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
        return res.status(200).json({ message: "Category deleted" });
      });
    })
    .catch(next);
});

module.exports = server;
