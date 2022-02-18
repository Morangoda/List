import React, { useState, useCallback } from "react";
import { Button, Input, FormFeedback, InputGroup, FormGroup } from "reactstrap";
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
        <Input
        className="toy"
          invalid={!!errors.toyName}
          valid={!errors.toyName}
          size="sm"
          name="toyName"
          type="text"
          value={newValues.toyName}
          onChange={handleChange}
        />
        <FormFeedback>
          <span>{errors.toyName}</span>
        </FormFeedback>
      </td>
      <td>
        <>
          <Input
          className="color"
            invalid={!!errors.color}
            valid={!errors.color}
            size="sm"
            type="select"
            name="color"
            value={newValues.color}
            onChange={handleChange}
          >
            <option value="">Select color</option>
            {COLORS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Input>
          <FormFeedback>
            <span>{errors.color}</span>
          </FormFeedback>
        </>
      </td>
      <td>
        <>
          <InputGroup size="sm"  className="number">
            <Button color="dark" className="counter" onClick={increment}>
              +
            </Button>
            <Input
            
              invalid={!!errors.number}
              valid={!errors.number}
              name="number"
              type="number"
              value={newValues.number ?? ""}
              onChange={handleNumberChange}
            />
            <Button color="dark" className="counter" onClick={decrease}>
              -
            </Button>
            <FormFeedback>
              <span>{errors.number}</span>
            </FormFeedback>
          </InputGroup>
        </>
      </td>
      <td>
        <>
          <Button
            color="success"
            size="sm"
            className="other"
            onClick={handleSave}
            outline
          >
            Save
          </Button>{" "}
          <Button
            color="warning"
            size="sm"
            className="other"
            onClick={onCancel}
            outline
          >
            Cancel
          </Button>
        </>
      </td>
    </tr>
  );
}

export default EditRow;
