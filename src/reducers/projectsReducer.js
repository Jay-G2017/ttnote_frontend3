import React from "react";

export const ProjectsContext = React.createContext({});

export const projectsInitial = {projects: [], projectCreating: false};

export const projectsReducer = (state, action) => {
  switch (action.type) {
    case 'firstFetch':
      defaultGotoFirstProject(action.res);
      return {...state, projects: action.res};
    case 'handleProjectChangeFromRight':
      const projectId = action.payload.projectId;
      const params = action.payload.params;
      const targetProject = state.projects.find(project => project.id === projectId);
      Object.assign(targetProject, params);
      return {...state};
    case 'handleProjectDelete':
      console.log('delete');
      break;
    default:
        return state
  }

};

export const fetchProjects = (categoryId) => {
  let url;
  if (categoryId === -1) {
    url = window.ttnote.baseUrl + `/projects`;
  } else {
    url = window.ttnote.baseUrl + `/categories/${categoryId}/projects`;
  }
  return window.ttnote.fetch(url)
};

export const defaultGotoFirstProject = (res) => {
  const params = window.ttnote.searchObject();
  if (!params.projectId && res.length > 0) {
    gotoProject(res[0].id);
  }
};

function gotoProject(projectId) {
  const searchParams = window.ttnote.searchObject();
  if (projectId) {
    searchParams.projectId = projectId;
  } else {
    delete searchParams.projectId
  }
  window.ttnote.goto('/note' + window.ttnote.objectToUrl(searchParams));
}
