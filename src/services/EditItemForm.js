import React, { useState } from 'react';
import Swal from 'sweetalert2';

const EditItemForm = ({ editedItem, onSaveEdit, onCancelEdit }) => {
  const [editedTitle, setEditedTitle] = useState(editedItem.title);
  const [editedBody, setEditedBody] = useState(editedItem.body);

  const handleSaveEdit = () => {
    const updatedItem = {
      ...editedItem,
      title: editedTitle,
      body: editedBody,
    };
    onSaveEdit(updatedItem);
    setEditedTitle('');
    setEditedBody('');
    Swal.fire('Saved!', 'The changes have been saved.', 'success');
  };



  return (
    <div className="edit-form">
      <input
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />
      <textarea
        value={editedBody}
        onChange={(e) => setEditedBody(e.target.value)}
      />
      <button onClick={(e) => handleSaveEdit(e)}>Save</button>
    </div>
  );
};

export default EditItemForm;