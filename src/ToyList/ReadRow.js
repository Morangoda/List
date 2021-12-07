import React from "react";

function ReadRow({item, onEdit, onRemove}) {
  return (
    <tr>
      <td>{item.toyName}</td>
      <td>{item.color}</td>
      <td>{item.number}</td>
      <td>
        <>
          <button onClick={onEdit}>Edit</button>
          <button onClick={() => onRemove(item)}>Delete</button>
        </>
      </td>
    </tr>
  );
}

export default ReadRow;