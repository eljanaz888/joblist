import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Dropdown, Row } from "react-bootstrap";

const CreateJobSiteModal = ({ showModal, handleClose, saveJobSite }) => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("");
  const [jobSites, setJobSites] = useState([]);

  useEffect(() => {
    const storedJobSites = JSON.parse(localStorage.getItem("jobSites")) || [];
    setJobSites(storedJobSites);
  }, []);

  const handleSaveJobSiteInStorage = () => {
    const newJobSite = { name, categories, status };
    const updatedJobSites = [...jobSites, newJobSite];
    setJobSites(updatedJobSites);
    localStorage.setItem("jobSites", JSON.stringify(updatedJobSites));
    handleClose();
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCategoryChange = (event, category) => {
    event.preventDefault();
    event.stopPropagation();
    if (categories.includes(category)) {
      setCategories(categories.filter((item) => item !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSaveJobSite = () => {
    handleSaveJobSiteInStorage();
    saveJobSite({ name, categories, status });
    handleClose();
  };

  const categoryOptions = ["SidewalkShed", "Scaffold", "Shoring"];

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            onChange={handleNameChange}
          />
        </div>
        <Row className="mb-3">
          <Form className="col-md-8">
            <Form.Group>
              <Form.Label>Categories</Form.Label>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic" style={{ width: "100%" }}>
                  {categories.length > 0
                    ? `Selected (${categories.length})`
                    : "Select Categories"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {categoryOptions.map((category, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={(event) =>
                        handleCategoryChange(event, category)
                      }>
                      <Form.Check
                        type="checkbox"
                        label={category}
                        checked={categories.includes(category)}
                      />
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
          </Form>
          <div className="col-md-4">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              className="form-select"
              id="status"
              onChange={handleStatusChange}>
              <option value="">Select status</option>
              <option value="onRoad">On Road</option>
              <option value="completed">Completed</option>
              <option value="onHold">On Hold</option>
            </select>
          </div>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>

        <Button variant="primary" onClick={handleSaveJobSite}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateJobSiteModal;
