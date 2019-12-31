import {useCallback, useEffect, useState} from "react";
import {cloneDeep} from 'lodash';

function useProjects(categoryId) {
  const [projects, setProjects] = useState([]);
  const [projectCreating, setProjectCreating] = useState(false);

  const fetchProjects = useCallback((categoryId, afterSuccessCallback) => {
    let url;
    if (categoryId === -1) {
      url = window.ttnote.baseUrl + `/projects`;
    } else {
      url = window.ttnote.baseUrl + `/categories/${categoryId}/projects`;
    }
    window.ttnote.fetch(url)
      .then(res => {
        setProjects(res);
        if (afterSuccessCallback) afterSuccessCallback(res);
      })
  }, []);

  const defaultGotoFirstProject = useCallback((res) => {
    const params = window.ttnote.searchObject();
    if (!params.projectId && res.length > 0) {
      gotoProject(res[0].id);
      // params.projectId = res[0].id;
      // window.ttnote.goto('/note' + window.ttnote.objectToUrl(params));
    }
  }, []);

  useEffect(() => {
    fetchProjects(categoryId, defaultGotoFirstProject);
  }, [categoryId, fetchProjects, defaultGotoFirstProject]);

  const handleNewProject = useCallback((categoryId) => {
    setProjectCreating(true);
    const url = window.ttnote.baseUrl + '/categories/' + categoryId + '/projects';
    window.ttnote.fetch(url, {
      method: 'POST',
      body: JSON.stringify({name: '新建项目'})
    })
      .then(res => {
        setProjectCreating(false);
        const newProjects = cloneDeep(projects);
        newProjects.splice(0, 0, res);
        setProjects(newProjects);
        gotoProject(res.id);
      })
      .catch(err => {
        console.log('create failed');
      })

  }, [projects]);

  const defaultGotoUpwards = useCallback((res, projectId) => {
    const activeProjectId = window.ttnote.searchObject().projectId;
    if (activeProjectId === projectId.toString()) {
      // 删除的如果是选中项，选中状态默认往上移
      const index = projects.findIndex(project => project.id === projectId);
      if (res[index]) {
        gotoProject(res[index].id);
      } else if (res.length > 0) {
        gotoProject(res.slice(-1)[0].id);
      } else {
        gotoProject(null);
      }
    }
  }, [projects]);

  const handleProjectDelete = useCallback((projectId) => {
    const url = window.ttnote.baseUrl + '/projects/' + projectId;
    window.ttnote.fetch(url, {
      method: 'DELETE',
    })
      .then(res => {
        fetchProjects(categoryId, (res) => defaultGotoUpwards(res, projectId));
      })
      .catch(err => {
        console.log('delete failed');
      })

  }, [fetchProjects, categoryId, defaultGotoUpwards]);

  return {
    projects,
    projectCreating,
    handleNewProject,
    handleProjectDelete,
  };
}

export default useProjects;

function gotoProject(projectId) {
  const searchParams = window.ttnote.searchObject();
  if (projectId) {
    searchParams.projectId = projectId;
  } else {
    delete searchParams.projectId
  }
  window.ttnote.goto('/note' + window.ttnote.objectToUrl(searchParams));
}
