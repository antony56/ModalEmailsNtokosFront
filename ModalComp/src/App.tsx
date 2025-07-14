// Main app component
import React, { useState } from 'react';
import Modal from './components/Modal';
import EmailForm from './components/EmailForm';
import { Container, Button, Navbar, Card } from 'react-bootstrap';

function App() {
  // Tracks if the modal is open
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    // App background
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Top navbar */}
      <Navbar bg="light" expand="lg" className="shadow-sm mb-4">
        <Container>
          <Navbar.Brand href="#home" className="fw-bold">
             Ntokos Antonios
          </Navbar.Brand>
        </Container>
      </Navbar>
      {/* Main content area */}
      <div className="d-flex justify-content-center align-items-center hoverModal" style={{ width: '100vw', height: 'calc(100vh - 72px)' }}>
        <Card className="p-4 shadow-sm text-center" style={{ minWidth: 320 }}>
          {/* Welcome message */}
          <h2 className="mb-4">Click the button to open the modal and send an email</h2>
          {/* Button to open modal */}
          <Button variant="primary" size="lg" onClick={() => setIsModalOpen(true)}>
            Open Email Modal
          </Button>
        </Card>
        {/* Email modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <EmailForm />
        </Modal>
      </div>
      {/* Footer */}
      <div className="d-flex justify-content-center align-items-center" >
      <footer className="bg-light text-center py-3 mt-auto border-top">
        © Antonios Ntokos 2025 - Assignment for Front End Job
      </footer>
      </div>
    </div>
  );
}

export default App;
