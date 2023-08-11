import Swal from 'sweetalert2';
import React from 'react';
import icon from "../images/remove.png";

const DeleteItemButton = ({ onDelete, itemId }) => {
  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(itemId); 
        Swal.fire('Deleted!', 'The item has been deleted.', 'success');
      }
    });
  };

  return (
    <img
      src={icon}
      className='icon-delete'
      alt="Delete"
      onClick={handleDelete}
    />
  );
};

export default DeleteItemButton;