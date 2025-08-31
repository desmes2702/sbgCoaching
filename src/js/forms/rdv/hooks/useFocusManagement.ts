import { useEffect } from 'react';

/**
 * Custom hook to manage focus on the first invalid form field or a global alert.
 * It prioritizes focusing on an alert element if a global error exists,
 * then falls back to focusing on the first element with `aria-invalid="true"`
 * when validation errors change.
 * @param errors The object containing validation errors, where keys are field IDs and values are error messages.
 * @param globalError A string representing a global error message.
 */
const useFocusManagement = (errors: Record<string, string> | null, globalError: string | null) => {
  useEffect(() => {
    if (globalError) {
      // Focus on the alert container first
      const alertElement = document.querySelector('[role="alert"]');
      if (alertElement) {
        (alertElement as HTMLElement).focus();
        return;
      }
    }
    
    // Then on the first invalid field
    const firstErrorElement = document.querySelector('[aria-invalid="true"]');
    if (firstErrorElement) {
      (firstErrorElement as HTMLElement).focus();
    }
  }, [errors, globalError]);
};

export default useFocusManagement;