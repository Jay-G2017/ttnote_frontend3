import {useEffect, useState} from "react";

function useProjects(categoryId) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = () => {
      let url;
      if (categoryId === -1) {
        url = window.ttnote.baseUrl + `/projects`;
      } else {
        url = window.ttnote.baseUrl + `/categories/${categoryId}/projects`;
      }
      window.ttnote.fetch(url)
        .then(res => {
          setProjects(res);
          if (res.length > 0) {
            const params = window.ttnote.searchObject();
            params.projectId = res[0].id;
            window.ttnote.goto('/note' + window.ttnote.objectToUrl(params));
          }
        })
    };

    fetchProjects(categoryId);
  }, [categoryId]);

  return {projects};
}

export default useProjects;
