import Swal from "sweetalert2";

export default async (id) =>
  Swal.fire({
    html: `<h5>¿Desea modificar el rol del usuario ?<h5/>`,
    width: "30%",
    text: "No podrás revertir esta cambio!",
    icon: "warning",
    showCancelButton: true,
    customClass: {
      icon: "w-25",
      confirmButton: "btn btn-sm btn-primary",
      cancelButton: "btn btn-sm btn-default border",
    },
    cancelButtonText: "Cancelar",
    confirmButtonText: "Si, modificar!",
  });
