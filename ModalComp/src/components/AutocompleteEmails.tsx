// Simple email autocomplete
import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { BsPeople, BsPlus ,BsX } from "react-icons/bs";

// Customer structure
export interface Customer {
  id: number;      // Unique id
  name: string;    // Name
  email: string;   // Email
}

// What the component gets
interface Props {
  selectedCustomers: Customer[];
  setSelectedCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
}

export default function AutocompleteEmails({ selectedCustomers, setSelectedCustomers }: Props) {
  // What the user types
  const [input, setInput] = useState('');
  // Suggestions
  const [suggestions, setSuggestions] = useState<Customer[]>([]);
  // Loading state
  const [loading, setLoading] = useState(false);
  // Email error
  const [emailError, setEmailError] = useState<string | null>(null);

  // When input changes, search after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (input) {
        fetchEmails();
      } else {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [input]);

  // Fetch emails from API and filter them
  const fetchEmails = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://686547495b5d8d0339808f5d.mockapi.io/spitogatos/api/customer-email-lookup');
      const data: Customer[] = await res.json();
      const filtered = data.filter(c =>
        c.email.toLowerCase().startsWith(input.toLowerCase()) ||
        c.name.toLowerCase().startsWith(input.toLowerCase())
      );
      setSuggestions(filtered);
    } catch (err) {
      console.error('Failed to fetch emails', err);
    } finally {
      setLoading(false);
    }
  };

  // Add customer to the list
  const addCustomer = (customer: Customer) => {
    if (!selectedCustomers.some(c => c.id === customer.id)) {
      setSelectedCustomers([...selectedCustomers, customer]);
    }
    setInput('');
    setSuggestions([]);
    setEmailError(null);
  };

  // Remove customer
  const removeCustomer = (id: number) => {
    setSelectedCustomers(selectedCustomers.filter(c => c.id !== id));
  };

  // Load all customers
  const loadAllCustomers = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://686547495b5d8d0339808f5d.mockapi.io/spitogatos/api/customer-email-lookup');
      const data: Customer[] = await res.json();
      setSelectedCustomers(data);
    } catch (err) {
      console.error('Failed to load all customers', err);
    } finally {
      setLoading(false);
    }
  };

  // Check email format
  const validateEmailFormat = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      {/* Show selected emails */}
      <div className="mb-2">
        {selectedCustomers.map(customer => (
          <div
            key={customer.id}
            className="me-1 mb-1 d-inline-flex align-items-center"
            style={{ fontSize: '1rem', padding: '0.5em 0.75em', background: '#f0f8ff', borderRadius: '8px' }}
          >
            {customer.email}
            <Button
              variant="link"
              size="sm"
              className="p-0 ms-2 text-danger"
              style={{ lineHeight: 1 }}
              onClick={() => removeCustomer(customer.id)}
              aria-label="Remove"
            >
              ×
            </Button>
          </div>
        ))}
      </div>
      {/* Search field */}
      <Form.Control
        type="text"
        placeholder="ntokosantonios@spitogatos.gr"
        value={input}
        onChange={(e) => {
          const value = e.target.value;
          setInput(value);
          if (value === "" || validateEmailFormat(value)) {
            setEmailError(null);
          } else {
            setEmailError("Must be valid email format");
          }
        }}
        className="mb-2"
      />
      {/* Error message */}
      {emailError && <div className="text-danger mb-2">{emailError}</div>}
      {loading && <Spinner animation="border" size="sm" className="me-2" />}
      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="border rounded bg-white position-absolute w-100" style={{ zIndex: 10 }}>
          {suggestions.map(s => (
            <div
              key={s.id}
              onClick={() => addCustomer(s)}
              className="p-2 border-bottom hover-bg-light"
              style={{ cursor: 'pointer' }}
            >
              {s.name} ({s.email})
            </div>
          ))}
        </div>
      )}
      {/* Buttons for all or none */}
      <div className="mt-2">
        <Button 
          variant="success" 
          type="button" 
          size="sm" 
          className="me-2 d-inline-flex align-items-center"
          onClick={loadAllCustomers} 
          disabled={loading}
        >
          <BsPeople className="me-1" />
          <BsPlus className="me-2" />
          {loading ? 'Loading...' : 'ADD ALL RECIPIENTS'}
        </Button>
        <Button 
          variant="outline-danger" 
          type="button" 
          size="sm" 
          className="d-inline-flex align-items-center"
          onClick={() => setSelectedCustomers([])}
        >
          <BsPeople className="me-1" />
          <BsX className="me-2" />
          REMOVE ALL RECIPIENTS
        </Button>
      </div>
    </div>
  );
}
