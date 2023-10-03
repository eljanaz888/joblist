import React from "react";
import { Button } from "react-bootstrap";

const CreateButton = ({ showModal }) => {
  return (
    <Button size='sm' className='btn btn-success mb-3' onClick={showModal}>
      Create +
    </Button>
  );
};

export default CreateButton;