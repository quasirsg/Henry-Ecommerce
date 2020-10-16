import axios from "axios";
import * as actionTypes from "./actionTypes";

const url = `http://localhost:3001`;

// export const deleteProdCategory = (idP, idC) => (dispatch) => {
//   axios
//     .delete(`/products/${idP}/category/${idC}`)
//     .then((res) => {
//       dispatch({
//         type: actionTypes.DELETE_PRODUCT_CATEGORY,
//         product_category: idC,
//       });
//     })
//     .catch((err) => console.log(err));
// };
