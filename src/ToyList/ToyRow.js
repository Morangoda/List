import React, { useState } from "react";
import EditRow from "./EditRow";
import ReadRow from "./ReadRow";

function ToyRow({ item, onSave, onRemove }) {
  const [edit, setEdit] = useState(false);
  const toggleEdit = () => setEdit(!edit);

  function handleSave(newValues) {
    onSave(item, newValues);
    toggleEdit();
  }

  return edit ? (
    <EditRow initialValue={item} onCancel={toggleEdit} onSave={handleSave} />
  ) : (
    <ReadRow item={item} onEdit={toggleEdit} onRemove={onRemove} />
  );
}

export default ToyRow;
