import React from "react";

const Category = ({ category }) => {

  return (
    <div className="sidebar">
      <aside className="">
        <h2>Categorias</h2>
        <ul>
          {category.map((cat) => {
            return (
              <li key={cat.id}>
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id={cat.id}
                  />
                  <label class="custom-control-label" for={cat.id}>
                    {cat.name}
                  </label>
                </div>
              </li>
            );
          })}
        </ul>
      </aside>
      <div>
        <button>Mostrar Todos</button>
      </div>
    </div>
  );
};

export default Category;
