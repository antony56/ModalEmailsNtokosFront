// Simple email form
import React, { useState, useRef } from 'react';
import AutocompleteEmails, { type Customer } from './AutocompleteEmails';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { BsEnvelopeFill, BsXSquareFill } from 'react-icons/bs';

export default function EmailForm() {
  // Subject, body, recipients
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);

  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // For scrolling to recipients if there's an error
  const recipientsRef = useRef<HTMLDivElement>(null);

  // When you submit the form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!subject.trim()) newErrors.subject = 'Subject is required';
    if (!description.trim() || description.length < 10)
      newErrors.description = 'Description must be at least 10 characters';
    if (selectedCustomers.length === 0)
      newErrors.emails = 'You must enter at least one recipient';
    if (selectedCustomers.some((c) => !validateEmail(c.email)))
      newErrors.emails = 'There is an invalid email in the list';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      if (newErrors.emails && recipientsRef.current) {
        recipientsRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
      return;
    }
    // Here you would send the data to a server
    console.log('Submitted customers:', selectedCustomers);
    alert('Form submitted, check console');
    // Clear the form
    setSubject('');
    setDescription('');
    setSelectedCustomers([]);
  };

  // Check email format
  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        <h3 className="mb-3" style={{ textAlign: 'center' }}>
          Email sent Form
        </h3>
        <Form onSubmit={handleSubmit}>
          {/* Recipients */}
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>
              List of recipients
            </Form.Label>
            <div ref={recipientsRef}>
              <AutocompleteEmails
                selectedCustomers={selectedCustomers}
                setSelectedCustomers={setSelectedCustomers}
              />
            </div>
            {/* Error message */}
            {errors.emails && (
              <div className="text-danger fw-bold mt-2">{errors.emails}</div>
            )}
          </Form.Group>
          {/* Subject */}
          <Form.Group className="mb-3">
            <Form.Label>
              Subject <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              isInvalid={!!errors.subject}
            />
            <Form.Control.Feedback type="invalid">
              {errors.subject}
            </Form.Control.Feedback>
          </Form.Group>
          {/* Message body */}
          <Form.Group className="mb-3">
            <Form.Label>Body of text</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>
          {/* Buttons */}
          <Row className="mb-3">
            <Col>
              <Button
                variant="danger"
                type="button"
                className="me-2 d-inline-flex align-items-center"
                onClick={() => setSelectedCustomers([])}
              >
                <BsXSquareFill className="me-1" /> Cancel
              </Button>
            </Col>
            <Col className="text-end">
              <Button variant="success" type="submit">
                <BsEnvelopeFill className="me-2" /> Send Email
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}
