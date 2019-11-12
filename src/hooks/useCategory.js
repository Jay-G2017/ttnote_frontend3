import {useEffect, useState} from "react";

function useCategory(categoryId) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = () => {
      const url = window.ttnote.baseUrl + '/categories';
      window.ttnote.fetch(url)
        .then(res => {
          setCategories(res);
          if (!categoryId) {
            const params = window.ttnote.searchObject();
            params.categoryId = -1;
            window.ttnote.goto('/note' + window.ttnote.objectToUrl(params));
          }
        })
    };

    let didCancel = false;
    if (!didCancel)
      fetchCategories();

    return () => didCancel = true
  }, [categoryId]);

  return {categories}
}

export default useCategory;
