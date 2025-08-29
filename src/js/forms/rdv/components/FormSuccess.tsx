// FILE: src/js/forms/rdv/components/FormSuccess.tsx
import React from 'react';

interface FormSuccessProps {
  message?: string;
  onReset: () => void;
}

const FormSuccess: React.FC<FormSuccessProps> = ({ message, onReset }) => {
  return (
    <div className="submission-feedback submission-feedback--success" role="status">
      <h3>Demande envoyée !</h3>
      <p>{message || "Merci. Nous avons bien reçu votre demande et nous vous recontacterons bientôt."}</p>
      <button type="button" onClick={onReset} className="button button--primary">
        Nouvelle demande
      </button>
    </div>
  );
};

export default FormSuccess;
