import React from "react";
import { Button } from "reactstrap";
import { useState } from "react/cjs/react.development";
import EditRow from "./EditRow";
import ToyRow from "./ToyRow";
import "./ToysList.css";
import ConfirmDialog from "./ConfirmationDialog";

const initialValue = {
  toyName: "",
  color: "",
  number: "",
};

function useToggleAdd() {
  const [value, setValue] = useState(false);
  const handleToggleAdd = () => setValue(!value);
  return { showAdd: value, toggleAdd: handleToggleAdd };
}

function ToysList() {
  const { showAdd, toggleAdd } = useToggleAdd();
  const [items, setItems] = useState([]);
  const [delItem, setDelItem] = useState(undefined);

  function hadleShowConfirmation(item) {
    setDelItem(item);
  }

  function handleCancelConfirmation() {
    setDelItem(undefined);
  }

  function handleAdd(values) {
    setItems([...items, values]);
    toggleAdd();
  }

  function handleRemove() {
    const result = [...items];
    const index = items.indexOf(delItem);
    result.splice(index, 1);
    setItems(result);
    setDelItem(undefined);
  }

  function handleSave(item, newValue) {
    const result = [...items];
    const index = result.indexOf(item);
    result[index] = newValue;
    setItems(result);
  }

  return (
    <div>
      <h2>Toys List</h2>
      <button color="dark" onClick={toggleAdd}>
        Add
      </button>
      <table>
        <thead>
          <tr>
            <th>Toy Name</th>
            <th>Color</th>
            <th>Number</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {showAdd && (
            <EditRow
              initialValue={initialValue}
              onSave={handleAdd}
              onCancel={toggleAdd}
            />
          )}
          {items.length === 0 && (
            <tr>
              <td colSpan={4}>No items on file</td>
            </tr>
          )}
          {items.map((item, index) => {
            return (
              <ToyRow
                key={index}
                item={item}
                onSave={handleSave}
                onRemove={hadleShowConfirmation}
              />
            );
          })}
        </tbody>
      </table>
      {delItem && (
        <ConfirmDialog
          item={delItem}
          onCancel={handleCancelConfirmation}
          onRemove={handleRemove}
        />
      )}
    </div>
  );
}

export default ToysList;
