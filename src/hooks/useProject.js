import {useCallback, useEffect, useState} from 'react';

function useProject(projectId) {
  const [project, setProject] = useState({});
  const [noProject, setNoProject] = useState(false);

  const fetchProject = useCallback(() => {
    const url = window.ttnote.baseUrl + '/projects/' + projectId;
    window.ttnote.fetch(url)
      .then(res => {
        setProject(res);
      })
  }, [projectId]);

  useEffect(()=> {
    if (projectId) {
      setNoProject(false);
      fetchProject(projectId);
    } else {
      setNoProject(true);
      setProject({})
    }
  }, [projectId, fetchProject]);

  const postToCreateTomato = (todoId, seconds) => {
    const url = window.ttnote.baseUrl + '/todos/' + todoId + '/tomatoes';
    window.ttnote.fetch(url, {
      method: 'post',
      body: JSON.stringify({minutes: window.ttnote.tomatoTime})
    }).then(res => {
      fetchProject()
    })
  };

  return {
    project,
    noProject,
    fetchProject,
    postToCreateTomato,
  }
}

export default useProject;