import {useCallback, useEffect, useState, useRef} from "react";
import {cloneDeep} from 'lodash';
import {CATEGORY_TYPE_INBOX} from "../common/constants";

export const gotoInbox = () => {
  const searchParams = window.ttnote.searchObject();
  delete searchParams.projectId;
  searchParams.categoryId = CATEGORY_TYPE_INBOX;
  window.ttnote.goto('/note' + window.ttnote.objectToUrl(searchParams));
};

function useCategory() {
  const [categories, setCategories] = useState([]);
  const categoriesInitial = useRef([]);

  const fetchCategories = useCallback((afterSuccessCallback) => {
    const url = window.ttnote.baseUrl + '/categories';
    window.ttnote.fetch(url)
      .then(res => {
        setCategories(res);
        categoriesInitial.current = cloneDeep(res);
        if (afterSuccessCallback) afterSuccessCallback();
      })
  }, []);


  // const defaultGoto = useCallback(() => {
  //   if (!categoryId) {
  //     gotoInbox();
  //   }
  // }, [categoryId, gotoInbox]);

  // useEffect(() => {
  //   let didCancel = false;
  //   if (!didCancel) {
  //     fetchCategories();
  //   }
  //
  //   return () => didCancel = true
  // }, [categoryId, fetchCategories]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCategoryNameOnChange = useCallback((id, value) => {
    const newCategories = cloneDeep(categories);
    const category = newCategories.find(ca => ca.id === id);
    category.name = value;
    setCategories(newCategories);
  }, [categories]);

  const updateCategoryLocal = useCallback((id, newCategory) => {
    const newCategories = cloneDeep(categories);
    const targetIndex = newCategories.findIndex(ca => ca.id === id);
    newCategories.splice(targetIndex, 1, newCategory);
    setCategories(newCategories);

    categoriesInitial.current = newCategories;
  }, [categories]);

  const updateCategory = useCallback((id, params) => {
    const url = window.ttnote.baseUrl + '/categories/' + id;
    window.ttnote.fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(params),
    })
      .then(res => {
        updateCategoryLocal(id, res);
      })

  }, [updateCategoryLocal]);

  const createCategory = useCallback((params) => {
    const url = window.ttnote.baseUrl + '/categories/';
    window.ttnote.fetch(url, {
      method: 'POST',
      body: JSON.stringify(params),
    })
      .then(res => {
        fetchCategories();
      })
      .catch(err => {
        setCategories(categoriesInitial.current);
      })
  }, [fetchCategories]);

  const handleCategoryNameOnBlur = useCallback((id) => {
    if (id === 'new') {
      const category = categories.find(ca => ca.id === 'new');
      createCategory({name: category.name});
    } else {
      const targetIndex = categories.findIndex(ca => ca.id === id);
      if (categories[targetIndex].name !== categoriesInitial.current[targetIndex].name) {
        const category = categories[targetIndex];
        updateCategory(id, {name: category.name});
      }
    }
  }, [categories, updateCategory, createCategory]);

  const handleCategoryNameCancel = useCallback(() => {
    setCategories(categoriesInitial.current);
  }, []);

  const deleteCategory = useCallback((id) => {
    const url = window.ttnote.baseUrl + '/categories/' + id;
    window.ttnote.fetch(url, {
      method: 'DELETE'
    })
      .then(res => {
        const activeCategoryId = window.ttnote.searchObject().categoryId;
        if (activeCategoryId === id.toString())
          gotoInbox();
        fetchCategories();
      })
      .catch(err => {
        setCategories(categoriesInitial.current);
      })

  }, [fetchCategories]);

  const handleCategoryDelete = useCallback((id) => {
    // const newCategories = cloneDeep(categories);
    // const index = newCategories.findIndex(ca => ca.id === id);
    // newCategories.splice(index, 1);
    // setCategories(newCategories);

    deleteCategory(id)

  }, [deleteCategory]);

  const handleNewCategory = useCallback(() => {
    const newCategories = cloneDeep(categories);
    newCategories.push({id: 'new', name: ''});
    setCategories(newCategories);
  }, [categories]);

  return {
    categories,
    categoryMethods: {
      handleCategoryNameOnChange,
      handleCategoryNameOnBlur,
      handleCategoryNameCancel,
      handleCategoryDelete,
      handleNewCategory,
    }
  }
}

export default useCategory;
