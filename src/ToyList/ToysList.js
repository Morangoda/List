import React from "react";
import { Button, Table } from "reactstrap";
import { useState } from "react/cjs/react.development";
import EditRow from "./EditRow";
import ToyRow from "./ToyRow";
import ModalMessage from "./ModalMessage";
import "./ToyList.css";

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
    <div className="app">
      <p class="text-center text-uppercase fs-2 fw-bold">List of toys</p>
      <Button size="sm" onClick={toggleAdd} className="other mb-2">
        Add
      </Button>
      <Table dark size="sm" hover striped>
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
              <td
                className="text-center text-muted py-3 fst-italic"
                colSpan={4}
              >
                No items on file
              </td>
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
      </Table>
      {delItem && (
        <ModalMessage
          item={delItem}
          onCancel={handleCancelConfirmation}
          onRemove={handleRemove}
        />
      )}
    </div>
  );
}

export default ToysList;
