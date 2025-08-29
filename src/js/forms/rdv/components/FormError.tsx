// FILE: src/js/forms/rdv/components/FormError.tsx
import React, { useEffect, useRef } from 'react';

interface FormErrorProps {
  globalMessage?: string;
  fieldErrors?: Record<string, string>; // Maps field name to error message
}

const FormError: React.FC<FormErrorProps> = ({ globalMessage, fieldErrors }) => {
  const errorRef = useRef<HTMLDivElement>(null);
  const hasErrors = !!globalMessage || (fieldErrors && Object.keys(fieldErrors).length > 0);

  useEffect(() => {
    if (hasErrors && errorRef.current) {
      errorRef.current.focus();
    }
  }, [hasErrors]);

  if (!hasErrors) {
    return null;
  }

  return (
    <div
      ref={errorRef}
      className="rdv-form__error" // Using BEM naming convention
      role="alert"
      aria-live="assertive"
      tabIndex={-1}
    >
      {globalMessage && <p>{globalMessage}</p>}
      {fieldErrors && Object.keys(fieldErrors).length > 0 && (
        <ul>
          {Object.entries(fieldErrors).map(([field, message]) => (
            <li key={field}>{message}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FormError;
