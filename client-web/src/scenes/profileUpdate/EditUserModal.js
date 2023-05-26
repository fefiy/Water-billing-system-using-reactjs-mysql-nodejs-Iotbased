import React, { useState, useContext} from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { AuthContext } from '../../context/authContext';


const EditUserModal = ({ setShowModal, showModal}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
 const {currentUser, login} = useContext(AuthContext)
  const handleSave = () => {
    // Prepare the updated user object
    const updatedUser = {  };
    // onSave(updatedUser);
  };

  return (
    <>
      {/* Trigger button to open the edit modal */}
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Edit User
      </Button>

      {/* Edit User Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* User edit form */}
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            {/* Add more form fields for other user attributes */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditUserModal;
