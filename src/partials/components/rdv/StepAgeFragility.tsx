import type { StepAgeFragilityProps } from "@/js/types/rdvTypes.ts";
import type { YesNoNa } from "@/js/types/rdvTypes.ts";
import { AGE_MIN, AGE_MAX, MIN_FRAGILITY_CHARS, validateAgeFragility, canProceedAgeFragility } from "@/js/validation/rdvValidation.ts";
import { ui, cx } from "@/js/forms/uiClasses.ts";
import { useState } from "react";

const fragilityChoices = [
  { id: "yes", label: "Oui" },
  { id: "no", label: "Non" },
  { id: "na", label: "Ne souhaite pas préciser" }
];

const readAsDataURL = (file: File) => new Promise<string>((res,rej)=>{
  const r=new FileReader(); r.onload=()=>res(r.result as string); r.onerror=rej; r.readAsDataURL(file);
});

export default function StepAgeFragility({ data, onChange, onPrev, onNext, canNext }: StepAgeFragilityProps) {
  const [touched, setTouched] = useState({ age: false, fragilityNotes: false });
  const [files, setFiles] = useState<File[]>([]);
  const warnings = validateAgeFragility(data);
  const valid = canProceedAgeFragility(data);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (valid) onNext?.();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Âge*
          <input
            type="number"
            min={AGE_MIN}
            max={AGE_MAX}
            value={data.age}
            onChange={e => onChange({ age: e.target.value === "" ? "" : Number(e.target.value) })}
            onBlur={() => setTouched(t => ({ ...t, age: true }))}
            className={ui.input}
            required
          />
        </label>
        {(touched.age || data.age) && warnings.age && (
          <div className={ui.error}>{warnings.age}</div>
        )}
      </div>
      <div>
        <div>Fragilité*</div>
        {fragilityChoices.map(opt => (
          <label key={opt.id} className={ui.choice}>
            <input
              type="radio"
              name="fragility"
              value={opt.id}
              checked={data.isSeniorOrFragile === opt.id}
              onChange={e => onChange({ isSeniorOrFragile: e.target.value as YesNoNa })}
            />
            {opt.label}
          </label>
        ))}
      </div>
      {data.isSeniorOrFragile === "yes" && (
        <div>
          <label>
            Détails
            <textarea
              value={data.fragilityNotes}
              onChange={e => onChange({ fragilityNotes: e.target.value })}
              onBlur={() => setTouched(t => ({ ...t, fragilityNotes: true }))}
              minLength={MIN_FRAGILITY_CHARS}
              className={ui.textarea}
              required
            />
          </label>
          {(touched.fragilityNotes || data.fragilityNotes) && warnings.fragilityNotes && (
            <div className={ui.error}>{warnings.fragilityNotes}</div>
          )}
        </div>
        <div>
          <label className={ui.label}>Upload documents (1-3 fichiers, max 5MB/fichier, JPG/PNG/PDF)</label>
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,application/pdf"
            onChange={async (e) => {
              const newFiles = Array.from(e.target.files || []);
              setFiles(newFiles);
              const filesData = await Promise.all(newFiles.map(async (file) => {
                const base64 = await readAsDataURL(file);
                return { name: file.name, type: file.type, size: file.size, base64 };
              }));
              onChange({ files: filesData });
            }}
          />
          {data.files && data.files.length > 0 && (
            <div>
              <h4>Fichiers sélectionnés:</h4>
              <ul>
                {data.files.map((file: any, index: number) => (
                  <li key={index}>
                    {file.name} ({Math.round(file.size / 1024)} KB)
                    {file.type.startsWith('image/') && <img src={file.base64} alt={file.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      <div className={ui.actions}>
        {onPrev && (
          <button type="button" className={ui.prev} onClick={onPrev}>
            Précédent
          </button>
        )}
        <button type="submit" className={ui.next} disabled={!canNext}>
          Suivant
        </button>
      </div>
    </form>
  );
}
