// src/js/hooks/useRdvCache.ts
import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "sbgcoaching.rdv.cache";
const CACHE_VERSION = 1;
const EXPIRES_MS = 1000 * 60 * 60 * 72; // 72h

type Persisted<T> = {
  v: number;   // version
  t: number;   // timestamp
  e: number;   // expiresAt
  step: number;
  data: T;
};

function canUseStorage() {
  try {
    const test = "__test__";
    localStorage.setItem(test, "1");
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

function loadFromStorage<T extends object>(defaults: T): { step: number; data: T } {
  if (!canUseStorage()) return { step: 0, data: defaults };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { step: 0, data: defaults };
    const parsed = JSON.parse(raw) as Persisted<T>;
    const now = Date.now();
    if (!parsed || parsed.v !== CACHE_VERSION || parsed.e < now) {
      localStorage.removeItem(STORAGE_KEY);
      return { step: 0, data: defaults };
    }
    return { step: Math.max(0, parsed.step || 0), data: { ...defaults, ...parsed.data } };
  } catch {
    return { step: 0, data: defaults };
  }
}

export function useRdvCache<T extends object>(totalSteps: number, defaults: T) {
  const initial = useMemo(() => loadFromStorage<T>(defaults), [defaults]);
  const [step, setStepState] = useState<number>(initial.step);
  const [data, setDataState] = useState<T>(initial.data);

  // setters
  const setStep = useCallback((fn: (s: number) => number) => {
    setStepState(prev => {
      const next = fn(prev);
      return Math.min(Math.max(0, next), Math.max(0, totalSteps - 1));
    });
  }, [totalSteps]);

  const setData = useCallback((fn: (d: T) => T) => {
    setDataState(prev => fn(prev));
  }, []);

  // persist
  useEffect(() => {
    if (!canUseStorage()) return;
    const now = Date.now();
    const payload: Persisted<T> = {
      v: CACHE_VERSION,
      t: now,
      e: now + EXPIRES_MS,
      step,
      data,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {}
  }, [step, data]);

  const reset = useCallback(() => {
    setStepState(0);
    setDataState(defaults);
    if (canUseStorage()) localStorage.removeItem(STORAGE_KEY);
  }, [defaults]);

  return { step, setStep, data, setData, reset };
}
