import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Modal, Form, Row, Col, Container } from "react-bootstrap";
import { HiArrowLeft } from "react-icons/hi";

const JobSiteDetail = ({ jobSites }) => {
  const { name } = useParams();
  const jobSite = jobSites.find((site) => site.name === name);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dummyItems, setDummyItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedItem, setEditedItem] = useState({
    id: null,
    number: null,
    item: "",
    quantity: 0,
    description: "",
    note: "",
    category: "",
  });

  const categoryOptions = ["sidewalkShed", "scaffold", "shoring"];

  useEffect(() => {
    const storedDummyItems =
      JSON.parse(localStorage.getItem("dummyItems")) || [];
    if (storedDummyItems.length > 0) {
      setDummyItems(storedDummyItems);
    } else {
        let allDummyItems = [];
        let itemIdCounter = 1;

        categoryOptions.forEach((category) => {
        const categoryDummyItems = [...Array(20)].map(() => ({
            id: itemIdCounter++,
            number: itemIdCounter,
            item: `Item ${itemIdCounter}`,
            quantity: Math.floor(Math.random() * 10) + 1,
            description: "Dummy description",
            note: "Dummy note",
            category: category,
        }));

        allDummyItems = [...allDummyItems, ...categoryDummyItems];
        });

        setDummyItems(allDummyItems);
        localStorage.setItem("dummyItems", JSON.stringify(allDummyItems));
    }
  }, []);

  const handleSaveChanges = () => {
    const updatedItems = dummyItems.map((item) =>
      item.id === selectedItem.id ? editedItem : item,
    );
    localStorage.setItem("dummyItems", JSON.stringify(updatedItems));
    setDummyItems(updatedItems);
    setShowModal(false);
  };

  //handleCategoryClick function to provide the dummy items for the selected category

  const handleCategoryClick = (category) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? "" : category,
    );
    setSearchTerm("");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setEditedItem(item);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  if (!jobSite) {
    return <div>Job Site not found</div>;
  }

  let progressiveNumber = 1;

  return (
    <Row style={{minHeight: "600px"}}>
      <Col md={3}>
        <div
          style={{
            backgroundColor: "#F9F6EE",
            padding: "1rem",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
          <div className='bg-light mb-3 p-2'>{jobSite.name}</div>
          {jobSite.categories.map((category, index) => (
            <Button
              key={index}
              className={`me-3 mb-2 btn-block d-flex align-items-center justify-content-start gap-1 ${
                selectedCategory === category ? "btn-secondary" : "btn-light"
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Button>
          ))}
          </div>
          <Link to='/' className="text-center">
            <Button variant='primary' className='mt-5'>
              Back to Job Sites <HiArrowLeft />
            </Button>
          </Link>
        </div>
      </Col>
        <Col md={9}>
        <div className='d-flex gap-5 justify-content-between align-items-center bg-light p-3'>
            <h6>{selectedCategory ? selectedCategory : "Data Grid"}</h6>
            <Form.Control
            style={{width: '50%'}}
              type='text'
              placeholder='Search items...'
              className='mb-2'
              size='sm'
              value={searchTerm}
              onChange={handleSearch}
            />
        </div>
        {!selectedCategory && (
            <div className="d-flex justify-content-center align-items-center text-center" style={{height: "100%"}}>
            No service selected.
            <br/>
            PLease select a service!
            </div>
        )}
        {selectedCategory && (
            <>
          <Container className='text-center'>
            <Row className='font-weight-bold'>
              <Col className='mb-2'>Nr.</Col>
              <Col>Item</Col>
              <Col>Quantity</Col>
              <Col>Description</Col>
              <Col>Notes</Col>
            </Row>
            {dummyItems
              .filter((item) =>
                ["item", "description", "note"].some((field) =>
                  item[field].toLowerCase().includes(searchTerm.toLowerCase()),
                ),
              )
              .map((item, index) => (
                <>
                {item.category === selectedCategory && (
                    <Row
                  key={item.id}
                  className={`list-group-item d-flex justify-content-between align-items-center ${
                    index % 2 === 0 ? "bg-white" : "bg-light"
                  }`}
                  onDoubleClick={() => handleEditItem(item)}
                >
                  <Col>{progressiveNumber++}</Col>
                  <Col>{item.number}</Col>
                  <Col>{item.quantity}</Col>
                  <Col>{item.description}</Col>
                  <Col>{item.note}</Col>
                </Row>
                    )}
                    </>
              ))}
          </Container>
          </>
          )}
        </Col>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>

            
          <Form.Group className='mb-3 col-md-6'>
            <Form.Label>Item</Form.Label>
            <Form.Control
              type='text'
              value={editedItem.item}
              onChange={(e) =>
                setEditedItem({ ...editedItem, item: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className='mb-3 col-md-6'>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type='number'
              value={editedItem.quantity}
              onChange={(e) =>
                setEditedItem({ ...editedItem, quantity: e.target.value })
              }
            />
          </Form.Group>
          </Row>
          <Form.Group className='mb-3'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={editedItem.description}
              style={{resize: 'none'}}
              onChange={(e) =>
                setEditedItem({ ...editedItem, description: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={editedItem.note}
              style={{resize: 'none'}}
              onChange={(e) =>
                setEditedItem({ ...editedItem, note: e.target.value })
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleModalClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};

export default JobSiteDetail;