import { useEffect } from "react";

export function useAutoGrow(ref: React.RefObject<HTMLTextAreaElement>, value: string) {
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }, [ref, value]);
}
