import React, { useState } from "react";
//import { validationShema } from "./ValidationShema";

const COLORS = [
  "black",
  "red",
  "white",
  "yellow",
  "green",
  "gray",
  "orange",
  "purple",
];

function EditRow({ initialValue, onSave, onCancel }) {
  const [newValues, setNewValues] = useState(initialValue);
  //const [errors, setErrors] = useState({});

  const set = (name) => {
    return ({ target: { value } }) => {
      setNewValues((oldValues) => ({ ...oldValues, [name]: value }));
    };
  };

  const increment = () => {
    setNewValues((currentValues) => ({
      ...currentValues,
      number: currentValues.number + 1,
    }));
  };

  const decrease = () => {
    setNewValues((currentValues) => ({
      ...currentValues,
      number: currentValues.number - 1,
    }));
  };

  const handleNumberChange = (event) => {
    const {
      target: { value },
    } = event;
    

    const intValue = value !== "" ? Number.parseInt(value) : undefined;

    setNewValues({
      ...newValues,
      number: intValue,
    });
  };

  /*const handleChange = (event) => {
    const fieldName = [event.target.name];
    const fieldValue = event.target.value;
    setNewValues({ ...newValues, [fieldName]: fieldValue });
  };

  function validate() {
    const errors = {};
    Object.keys(validationShema).forEach((key) => {
      errors[key] = validationShema[key](newValues[key]);
    });
    setErrors(errors);
    return Object.values(errors).filter((x) => !!x).length > 0;
  }*/

  function handleSave() {
    // if (validate()) return;
    onSave(newValues);
  }

  /**
   * newValues = {
   *  number: 1,
   *  toyName: 'NBH',
   *  color: undefined
   * }
   *
   * // spread operator
   * newNewValues = {};
   * newNewValues.number = newValues.number;
   * newNewValues.toyName = newValues.toyName;
   * newNewValues.color = newValues.color;
   *
   * // your assign
   * newNewValues.color = "your-color";
   *
   * newValues = newNewValues;
   *
   *
   *
   *
   *
   * Number:
   * newValues = {
   *  number: 1,
   *  toyName: 'NBH',
   *  color: undefined
   * }
   *
   * newNewValues = {};
   * newNewValues.number = 1;
   *
   * newValues = newNewValues;
   *
   */

  return (
    <tr>
      <td>
        <input
          name="toyName"
          type="text"
          value={newValues.toyName}
          onChange={set("toyName")}
        />
      </td>
      <td>
        <select name="color" value={newValues.color} onChange={set("color")}>
          <option value="">Select color</option>
          {COLORS.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </td>
      <td>
        <button onClick={increment}>+</button>
        <input
          name="number"
          type="number"
          value={newValues.number ?? ""}
          onChange={handleNumberChange}
        />
        <button onClick={decrease}>-</button>
      </td>
      <td>
        <>
          <button onClick={handleSave}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </>
      </td>
    </tr>
  );
}

export default EditRow;
