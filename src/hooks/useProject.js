import {useCallback, useEffect, useRef, useState} from 'react';

function useProject(projectId) {
  const [project, setProject] = useState({todos: {}, titles: {}, todoIds: [], titleIds: []});
  const [todoExpandedKeys, setTodoExpandedKeys] = useState([]);
  const projectInitial = useRef({todos: {}, titles: {}, todoIds: [], titleIds: []});

  const stopEventFlag = useRef(false);
  const projectNameInput = useRef(null);
  const projectDescInput = useRef(null);

  const {todos, titles} = project;

  const fetchProject = useCallback(() => {
    const url = window.ttnote.baseUrl + '/projects/' + projectId + '?v1=true';
    window.ttnote.fetch(url)
      .then(res => {
        setProject(res);
        projectInitial.current = JSON.parse(JSON.stringify(res));
      })
  }, [projectId]);

  useEffect(() => {
    if (projectId) {
      fetchProject();
    }
  }, [projectId, fetchProject]);

  const handleProjectNameChange = (value) => {
    setProject({...project, name: value});
  };

  const handleProjectNameEnterPress = (e) => {
    stopEventFlag.current = true;
    e.currentTarget.blur();
    if (project.name !== projectInitial.current.name) {
      const value = e.currentTarget.value;
      if (value) {
        updateProject({name: value});
        projectDescInput.current.focus();
      } else {
        setProject({...project, name: projectInitial.current.name})
      }
    } else {
      projectDescInput.current.focus();
    }
    stopEventFlag.current = false;
  };

  const handleProjectNameOnBlur = () => {
    if (stopEventFlag.current) return;
    if (project.name !== projectInitial.current.name) {
      const value = project.name;
      if (value) {
        updateProject({name: value});
      } else {
        setProject({...project, name: projectInitial.current.name})
      }
    }
  };

  const handleProjectDescOnChange = (e) => {
    const value = e.currentTarget.value;
    setProject({...project, desc: value});
  };

  const handleProjectDescOnBlur = () => {
    if (stopEventFlag.current) return;
    if (project.desc !== projectInitial.current.desc) {
      updateProject({desc: project.desc});
    }
  };

  const handleProjectDescEnterPress = (e) => {
    stopEventFlag.current = true;
    e.currentTarget.blur();
    if (project.desc !== projectInitial.current.desc) {
      updateProject({desc: project.desc});
    }
    stopEventFlag.current = false;

    // new todo
  };

  const postToCreateTomato = (todoId, seconds) => {
    const url = window.ttnote.baseUrl + '/todos/' + todoId + '/tomatoes';
    window.ttnote.fetch(url, {
      method: 'post',
      body: JSON.stringify({minutes: window.ttnote.tomatoTime})
    }).then(res => {
      // fetchProject();
      setProject(data => {
       data.todos[todoId].tomatoes.push(res);
       return {...data}
      });
      setTodoExpandedKeys(keys => {
        keys.push(todoId);
        return keys;
      });
    })
  };

  const updateProject = (params) => {
    const url = window.ttnote.baseUrl + '/projects/' + projectId;
    window.ttnote.fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(params)
    })
      .then(res => {
        console.log(res)
      })
  };

  const handleNewTodo = (titleId) => {
    setProject(data => {
      const id = -Date.now();
      if (titleId) {
        data.titles[titleId].todoIds.push(id);
      } else {
        data.todoIds.push(id);
      }
      data.todos[id] = {id};
      return {...data};
    });
  };

  const handleNewTitle = () => {
    setProject(data => {
      const id = -Date.now();
      data.titleIds.push(id);
      data.titles[id] = {id};
      return {...data};
    });
  };

  const handleTodoNameChange = (todoId, value) => {
    setProject(data => {
      data.todos[todoId].name = value;
      return {...data}
    })
  };

  const handleTitleNameChange = (titleId, value) => {
    setProject(data => {
      data.titles[titleId].name = value;
      return {...data}
    })
  };

  const handleTodoNameEnterPress = (e, todoId, titleId) => {
    stopEventFlag.current = true;
    e.currentTarget.blur();
    const value = e.currentTarget.value;
    if (value) {
      handleNewTodo(titleId);
      if (todoId > 0) {
        if (todos[todoId].name !== projectInitial.current.todos[todoId].name) {
          updateTodo(todoId, {name: value});
        }
      } else {
        createTodo(todoId, titleId, {name: value})
      }
    } else {
      if (todoId > 0) {
        handleTodoDelete(todoId, titleId)
      } else {
        setProject(data => {
          if (titleId) {
            const index = data.titles[titleId].todoIds.indexOf(todoId);
            data.titles[titleId].todoIds.splice(index, 1);
          } else {
            const index = data.todoIds.indexOf(todoId);
            data.todoIds.splice(index, 1);
          }
          delete data.todos[todoId];
          return {...data}
        });
      }
    }
    stopEventFlag.current = false;
  };

  const handleTitleNameEnterPress = (e, titleId) => {
    stopEventFlag.current = true;
    e.currentTarget.blur();
    const value = titles[titleId].name;
    if (value) {
      handleNewTodo(titleId);
      if (titleId > 0) {
        const oldValue = projectInitial.current.titles[titleId].name;
        if (value !== oldValue) {
          updateTitle(titleId, {name: value});
        }
      } else {
        createTitle(titleId, {name: value})
      }
    } else {
      if (titleId > 0) {
        handleTitleDelete(titleId)
      } else {
        setProject(data => {
          const index = data.titleIds.indexOf(titleId);
          data.titleIds.splice(index, 1);
          delete data.titles[titleId];
          return {...data}
        });
      }
    }
    stopEventFlag.current = false;
  };

  const handleTodoDelete = (todoId, titleId) => {
    // 如果todo下面有蕃茄，就不删，返回原值
    const haveTomatoes = todos[todoId].tomatoes && todos[todoId].tomatoes.length > 0;
    if (haveTomatoes) {
      setProject(data => {
        data.todos[todoId].name = projectInitial.current.todos[todoId].name;
        return {...data}
      })
    } else {
      setProject(data => {
        let index;
        if (titleId) {
          index = data.titles[titleId].todoIds.indexOf(todoId);
          data.titles[titleId].todoIds.splice(index, 1);
        } else {
          index = data.todoIds.indexOf(todoId);
          data.todoIds.splice(index, 1);
        }
        delete data.todos[todoId];
        return {...data};
      });
      deleteTodo(todoId);
    }
  };

  const handleTitleDelete = (titleId) => {
    // 如果title下面有todo就不删，返回原值
    const haveTodos = titles[titleId].todoIds && titles[titleId].todoIds.length > 0;
    if (haveTodos) {
      setProject(data => {
        data.titles[titleId].name = projectInitial.current.titles[titleId].name;
        return {...data}
      })
    } else {
      setProject(data => {
        const index = data.titleIds.indexOf(titleId);
        data.titleIds.splice(index, 1);
        delete data.titles[titleId];
        return {...data};
      });
      deleteTitle(titleId);
    }
  };

  const handleTodoNameOnBlur = (todoId, titleId) => {
    if (stopEventFlag.current) return;
    const value = todos[todoId].name;
    if (value) {
      if (todoId > 0) {
        const oldValue = projectInitial.current.todos[todoId].name;
        if (value !== oldValue) {
          updateTodo(todoId, {name: value});
        }
      } else {
        createTodo(todoId, titleId, {name: value})
      }
    } else {
      if (todoId > 0) {
        handleTodoDelete(todoId, titleId)
      } else {
        setProject(data => {
          const index = data.todoIds.indexOf(todoId);
          data.todoIds.splice(index, 1);
          delete data.todos[todoId];
          return {...data}
        });
      }
    }
  };

  const createTodo = (todoId, titleId, params) => {
    const url = window.ttnote.baseUrl + `/projects/${projectId}/titles/${titleId ? titleId : '-1'}/todos`;
    window.ttnote.fetch(url, {
      method: 'POST',
      body: JSON.stringify(params)
    })
      .then(res => {
        console.log(res);
        // fetchProject();
        if (titleId) {
          localReplaceTodoAfterCreateWithTitle(todoId, titleId, res)
        } else {
          localReplaceTodoAfterCreate(todoId, res)
        }

      }).catch(res => {
        // todo
    })
  };

  const localReplaceTodoAfterCreate = (oldTodoId, newTodoObj) => {
    setProject(data => {
      const index = data.todoIds.indexOf(oldTodoId);
      data.todoIds.splice(index, 1);
      data.todoIds.splice(index, 0, newTodoObj.id);
      delete data.todos[oldTodoId];
      data.todos[newTodoObj.id] = {...newTodoObj};

      projectInitial.current.todoIds.splice(index, 0, newTodoObj.id);
      projectInitial.current.todos[newTodoObj.id] = {...newTodoObj};

      return {...data}
    })
  };

  const localReplaceTodoAfterCreateWithTitle = (oldTodoId, titleId, newTodoObj) => {
    setProject(data => {
      const index = data.titles[titleId].todoIds.indexOf(oldTodoId);
      data.titles[titleId].todoIds.splice(index, 1);
      data.titles[titleId].todoIds.splice(index, 0, newTodoObj.id);
      delete data.todos[oldTodoId];
      data.todos[newTodoObj.id] = {...newTodoObj};

      projectInitial.current.titles[titleId].todoIds.splice(index, 0, newTodoObj.id);
      projectInitial.current.todos[newTodoObj.id] = {...newTodoObj};

      return {...data}
    })
  };

  const createTitle = (titleId, params) => {
    const url = window.ttnote.baseUrl + `/projects/${projectId}/titles/`;
    window.ttnote.fetch(url, {
      method: 'POST',
      body: JSON.stringify(params)
    })
      .then(res => {
        console.log(res);
        // fetchProject();
        setProject(data => {
          // 先不考虑title
          const index = data.titleIds.indexOf(titleId);
          data.titleIds.splice(index, 1);
          data.titleIds.splice(index, 0, res.id);
          delete data.titles[titleId];
          data.titles[res.id] = {...res};

          projectInitial.current.titleIds.splice(index, 0, res.id);
          projectInitial.current.titles[res.id] = {...res};

          return {...data}
        })
      }).catch(res => {
      // todo
    })
  };

  const updateTodo = (todoId, params) => {
    const url = window.ttnote.baseUrl + '/todos/' + todoId;
    window.ttnote.fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(params)
    })
      .then(res => {
        // fetchProject();
        setProject(data => {
          data.todos[todoId] = {...res};
          projectInitial.current.todos[todoId] = {...res};
          return {...data}
        });
      })
  };

  const updateTitle = (titleId, params) => {
    const url = window.ttnote.baseUrl + '/titles/' + titleId;
    window.ttnote.fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(params)
    })
      .then(res => {
        // fetchProject();
        setProject(data => {
          data.titles[titleId] = {...res};
          projectInitial.current.titles[titleId] = {...res};
          return {...data}
        });
      })
  };

  const deleteTodo = (todoId) => {
    const url = window.ttnote.baseUrl + '/todos/' + todoId;
    window.ttnote.fetch(url, {
      method: 'DELETE'
    })
      .then(res => {
        console.log(res)
      })
  };

  const deleteTitle = (titleId) => {
    const url = window.ttnote.baseUrl + '/titles/' + titleId;
    window.ttnote.fetch(url, {
      method: 'DELETE'
    })
      .then(res => {
        console.log(res)
      })
  };

  return {
    project,
    setProject,
    projectInitial,
    fetchProject,
    postToCreateTomato,
    updateProject,
    handleNewTodo,
    handleNewTitle,
    handleTodoNameChange,
    handleTitleNameChange,
    handleProjectNameChange,
    projectNameInput,
    projectDescInput,
    handleProjectNameEnterPress,
    handleProjectNameOnBlur,
    handleProjectDescOnChange,
    handleProjectDescOnBlur,
    handleProjectDescEnterPress,
    handleTodoNameEnterPress,
    handleTitleNameEnterPress,
    handleTodoNameOnBlur,
    todoExpandedKeys,
    setTodoExpandedKeys,
  }
}

export default useProject;