import {useCallback, useEffect, useState} from "react";
import {cloneDeep} from 'lodash';
import {CATEGORY_TYPE_INBOX} from "../common/constants";

function useProjects(categoryId) {
  const [projects, setProjects] = useState([]);
  const [projectCreating, setProjectCreating] = useState(false);

  const fetchProjects = useCallback((categoryId, afterSuccessCallback) => {
      let url;
      if (categoryId === CATEGORY_TYPE_INBOX) {
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

  const handleNewProject = useCallback(() => {
    setProjectCreating(true);
    const url = window.ttnote.baseUrl + '/categories/' + categoryId + '/projects';
    window.ttnote.fetch(url, {
      method: 'POST',
      body: JSON.stringify({name: '新建项目', desc: ''})
    })
      .then(res => {
        setProjectCreating(false);
        window.focusProjectName = true; // 用于新建项目自动focus
        const newProjects = cloneDeep(projects);
        newProjects.splice(0, 0, res);
        setProjects(newProjects);
        gotoProject(res.id);
      })
      .catch(err => {
        console.log('create failed');
      })

  }, [categoryId, projects]);

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

  const handleProjectChangeFromRight = useCallback((projectId, params) => {
    const newProjects = cloneDeep(projects);
    const target = newProjects.find(project => project.id === projectId);
    Object.assign(target, params);
    setProjects(newProjects);
  }, [projects]);

  const syncProject = useCallback((projectId) => {
    const url = window.ttnote.baseUrl + `/projects/${projectId}?simple=true`;
    window.ttnote.fetch(url)
      .then(_project => {
        setProjects(newProjects => {
          const targetProject = newProjects.find(project => project.id.toString() === projectId);
          if (targetProject)
            Object.assign(targetProject, _project);
          return [...newProjects]
        });
      })
  }, []);

  return {
    projects,
    projectCreating,
    handleNewProject,
    handleProjectDelete,
    handleProjectChangeFromRight,
    syncProject,
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
