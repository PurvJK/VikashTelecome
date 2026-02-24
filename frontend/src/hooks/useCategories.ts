import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { categories as fallbackCategories } from "@/data/categories";
import type { Category } from "@/data/categories";

export const useCategories = () => {
  const [items, setItems] = useState<Category[]>(fallbackCategories);

  useEffect(() => {
    let isMounted = true;

    api.fetchCategories()
      .then((data) => {
        if (isMounted && data.length > 0) {
          setItems(data);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  return items;
};
