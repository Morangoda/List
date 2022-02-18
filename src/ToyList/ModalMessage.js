import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap";

function ModalMessage({ item, onRemove, onCancel }) {
  return (
    <Modal  isOpen toggle={onCancel} >
      <ModalHeader toggle={onCancel}>Are you sure you wish to delete this item?</ModalHeader>
      <ModalBody>
        <p>Name: {item.toyName}</p>
        <p>Color: {item.color}</p>
        <p>Number: {item.number}</p>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" outline onClick={onRemove}>
          Delete
        </Button>{" "}
        <Button outline onClick={onCancel}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalMessage;
