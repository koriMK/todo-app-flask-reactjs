import { useEffect } from "react";

export const useSEO = (title) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};
