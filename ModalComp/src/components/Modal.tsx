// Simple modal window
import React from 'react';
import type { ReactNode } from 'react';
import { Modal as RBModal } from 'react-bootstrap';

// What the modal gets
interface ModalProps {
  isOpen: boolean;        // If open
  onClose: () => void;    // Close function
  children: ReactNode;    // Content
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    // Modal with header and body
    <RBModal show={isOpen} onHide={onClose} centered size="lg">
      {/* Header with close button */}
      <RBModal.Header closeButton onHide={onClose} />
      {/* Content goes here */}
      <RBModal.Body>
        {children}
      </RBModal.Body>
    </RBModal>
  );
}
