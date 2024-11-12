import "./Modal.css";
import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <>
      <div className="ModalOverlay" onClick={onClose}>
        <div className="ModalContent" onClick={(e) => e.stopPropagation()}>
          <button className="ModalClose" onClick={onClose}>
            &times;
          </button>
          <div className="ChildrenContent">{children}</div>
        </div>
      </div>
    </>
  );
}
