import Swal from 'sweetalert2';
import React, { useState } from 'react';
import moment from 'moment';

const AddItemModal = ({ onAddItem, onCancelAdd }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleAdd = () => {
    if (!title.trim() || !body.trim()) {
      Swal.fire ({
        icon: "warning",
        text: "Title or body cannot be empty!"
      } )
      return;
    } Swal.fire('Added!', 'The item has been successfully added.', 'success');

    const newItem = {
      title,
      body,
      date: moment().format('LLLL'),
    };

    onAddItem(newItem);
    setTitle('');
    setBody('');
  };

  return (
    <div className="add-modal">
      <div className="add-modal-content">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title.."
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter body.."
        />
        <button className='add-btn' onClick={handleAdd}>Add</button>
        <button  className= 'cancel-btn'onClick={onCancelAdd}>Cancel</button>
      </div>
    </div>
  );
};

export default AddItemModal;