import React from "react";
import { Button } from "reactstrap";

function ReadRow({item, onEdit, onRemove}) {
  return (
    <tr>
      <td>{item.toyName}</td>
      <td>{item.color}</td>
      <td>{item.number}</td>
      <td>
        <>
          <Button color="light" className="other" size="sm" outline onClick={onEdit}>Edit</Button>
          {" "}
          <Button color="danger" className="other" size="sm" outline onClick={() => onRemove(item)}>Delete</Button>
        </>
      </td>
    </tr>
  );
}

export default ReadRow;