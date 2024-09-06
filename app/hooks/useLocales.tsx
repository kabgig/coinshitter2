import { useState } from "react";
import en from "../configs/en.json";

const useLocale = () => {
  const [locale] = useState(en as { [key: string]: any });

  const translate = (key: string): string => {
    const result = key
      .split(".")
      .reduce((acc, part) => acc && acc[part], locale);
    return String(result || key);
  };

  return { translate };
};

export default useLocale;
