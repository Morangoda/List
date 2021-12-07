import React, { useState, useCallback } from "react";
import { validationShema } from "./ValidationShema";

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
  const [errors, setErrors] = useState({});

  /* const set = (name) => {
    return ({ target: { value } }) => {
      setNewValues((oldValues) => ({ ...oldValues, [name]: value }));
    };
  };*/

  const handleChange = useCallback(
    (event) => {
      const fieldName = [event.target.name];
      const fieldValue = event.target.value;
      setNewValues({ ...newValues, [fieldName]: fieldValue });
      setErrors({
        ...errors,
        [fieldName]: validationShema[fieldName](fieldValue),
      });
    },
    [newValues, errors, setNewValues, setErrors]
  );

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

  const handleNumberChange = useCallback(
    (event) => {
      const {
        target: { value },
      } = event;

      const intValue = value !== "" ? Number.parseInt(value) : undefined;

      setNewValues({
        ...newValues,
        number: intValue,
      });
      setErrors({
        ...errors,
        number: validationShema.number(intValue),
      });
    },
    [newValues, errors, setNewValues, setErrors]
  );

  function validate() {
    const errors = {};
    Object.keys(validationShema).forEach((key) => {
      errors[key] = validationShema[key](newValues[key]);
    });
    setErrors(errors);
    return Object.values(errors).filter((x) => !!x).length > 0;
  }

  function handleSave() {
    if (validate()) return;
    onSave(newValues);
  }

  return (
    <tr>
      <td>
        <input
          name="toyName"
          type="text"
          value={newValues.toyName}
          onChange={handleChange}
        />
        {errors.toyName && <span>{errors.toyName}</span>}
      </td>
      <td>
        <select name="color" value={newValues.color} onChange={handleChange}  >
          <option value="">Select color</option>
          {COLORS.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        {errors.color && <span>{errors.color}</span>}
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
        {errors.number && <span>{errors.number}</span>}
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
