import {useCallback, useEffect, useState} from "react";
import {cloneDeep} from 'lodash';

function useProjects(categoryId) {
  const [projects, setProjects] = useState([]);
  const [projectCreating, setProjectCreating] = useState(false);

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
          const params = window.ttnote.searchObject();
          if (!params.projectId && res.length > 0) {
            params.projectId = res[0].id;
            window.ttnote.goto('/note' + window.ttnote.objectToUrl(params));
          }
        })
    };

    fetchProjects(categoryId);
  }, [categoryId]);

  const handleNewProject = useCallback((categoryId) => {
    setProjectCreating(true);
    const url = window.ttnote.baseUrl + '/categories/' + categoryId + '/projects';
    window.ttnote.fetch(url, {
      method: 'POST',
      body: JSON.stringify({name: '新建项目'})
    })
      .then(res => {
        // setProjectCreating(false);
        const newProjects = cloneDeep(projects);
        newProjects.splice(0, 0, res);
        setProjects(newProjects);
        gotoProject(res.id);
      })
      .catch(err => {
        console.log('create failed');
      })

  }, [projects]);

  return {
    projects,
    projectCreating,
    handleNewProject,
  };
}

export default useProjects;

function gotoProject(projectId) {
  const searchParams = window.ttnote.searchObject();
  searchParams.projectId = projectId;
  window.ttnote.goto('/note' + window.ttnote.objectToUrl(searchParams));
}
