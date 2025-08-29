// FILE: src/js/forms/rdv/components/Uploader.tsx
/**
 * @file File uploader component with drag & drop, previews, and validation.
 */
import React, { useState, useRef, useCallback, useEffect } from "react";
import type { RdvFile } from "../types/rdvTypes.ts";
import {
  MAX_FILES,
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
  ALLOWED_FILE_TYPES,
} from "../utils/validation.ts";

// Helper to format bytes
const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

// PDF Icon component
const PdfIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 2.5a.5.5 0 0 1 .5.5v2.5h4.5a.5.5 0 0 1 0 1H8a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5z" />
    <path d="M5 0a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7.5a2 2 0 0 0-.586-1.414l-5-5A2 2 0 0 0 11.5 0H5zm0 2h6.5v5a2 2 0 0 0 2 2h5v13H5V2z" />
  </svg>
);

// Close Icon component
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
  </svg>
);

const readAsDataURL = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
});

interface UploaderProps {
  files: RdvFile[];
  onFilesAdded: (files: RdvFile[]) => void;
  onFileRemoved: (fileId: string) => void;
}

const Uploader: React.FC<UploaderProps> = ({ files, onFilesAdded, onFileRemoved }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (incomingFiles: FileList | File[]) => {
    const newFiles: RdvFile[] = [];
    const validationErrors: string[] = [];
    const currentFileCount = files.length;
    const validFiles: File[] = [];

    if (currentFileCount + incomingFiles.length > MAX_FILES) {
      validationErrors.push(`Vous ne pouvez pas dépasser ${MAX_FILES} fichiers au total.`);
    } else {
        Array.from(incomingFiles).forEach((file) => {
            if (!ALLOWED_FILE_TYPES.includes(file.type)) {
                validationErrors.push(`Type de fichier non valide : ${file.name}`);
            } else if (file.size > MAX_FILE_SIZE_BYTES) {
                validationErrors.push(`${file.name} est trop lourd (max ${MAX_FILE_SIZE_MB}Mo).`);
            } else {
                validFiles.push(file);
            }
        });
    }

    for (const file of validFiles) {
        try {
            const base64 = await readAsDataURL(file);
            newFiles.push({
                id: `${file.name}-${file.lastModified}-${file.size}`,
                name: file.name,
                type: file.type,
                size: file.size,
                previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
                base64,
                file: file,
            });
        } catch (error) {
            validationErrors.push(`Erreur de lecture du fichier ${file.name}`);
        }
    }

    setErrors(validationErrors);
    if (validationErrors.length === 0 && newFiles.length > 0) {
      onFilesAdded(newFiles);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        handleFiles(e.target.files);
    }
    if (e.target) e.target.value = '';
  };

  const triggerFileSelect = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleRemoveFile = (fileId: string) => {
    const fileToRemove = files.find(f => f.id === fileId);
    if (fileToRemove?.previewUrl) {
        URL.revokeObjectURL(fileToRemove.previewUrl);
    }
    onFileRemoved(fileId);
  };

  useEffect(() => {
    return () => {
      files.forEach(file => {
        if (file.previewUrl) {
          URL.revokeObjectURL(file.previewUrl);
        }
      });
    };
  }, [files]);

  return (
    <div className="uploader">
      {files.length < MAX_FILES && (
        <div
          className={`dropzone ${isDragging ? "dropzone--active" : ""}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={triggerFileSelect}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && triggerFileSelect()}
          tabIndex={0}
          role="button"
          aria-label="Zone de téléversement de fichiers"
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept={ALLOWED_FILE_TYPES.join(",")}
            onChange={handleInputChange}
            className="sr-only"
            aria-hidden="true"
          />
          <p className="dropzone__text">
            <strong>Cliquez pour choisir</strong> ou glissez-déposez vos fichiers ici.
          </p>
          <p className="dropzone__hint">
            PDF, PNG, JPG jusqu'à {MAX_FILE_SIZE_MB}Mo. Maximum {MAX_FILES} fichiers.
          </p>
        </div>
      )}

      {errors.length > 0 && (
        <ul className="errors" role="alert" aria-live="assertive">
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      )}

      {files.length > 0 && (
        <ul className="items">
          {files.map((file) => (
            <li key={file.id} className="item">
              <div className="thumb">
                {file.previewUrl ? (
                  <img src={file.previewUrl} alt={`Aperçu de ${file.name}`} />
                ) : (
                  <PdfIcon />
                )}
              </div>
              <div className="details">
                <p className="details__name">{file.name}</p>
                <p className="details__size">{formatBytes(file.size)}</p>
              </div>
              <button
                type="button"
                className="remove"
                onClick={() => handleRemoveFile(file.id)}
                aria-label={`Supprimer le fichier ${file.name}`}
              >
                <CloseIcon />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Uploader;
