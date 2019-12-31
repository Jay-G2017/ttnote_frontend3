import {useCallback, useEffect, useRef, useState} from 'react';
import {cloneDeep} from 'lodash';

function useProject(projectId) {
  const [project, setProject] = useState({todos: {}, titles: {}, todoIds: [], titleIds: []});
  const [isLoading, setIsLoading] = useState(true);
  const [todoExpandedKeys, setTodoExpandedKeys] = useState([]);
  const [todayTomatoSize, setTodayTomatoSize] = useState(0);
  const projectInitial = useRef({todos: {}, titles: {}, todoIds: [], titleIds: []});

  const stopEventFlag = useRef(false);

  const {todos, titles} = project;

  const fetchProject = useCallback(() => {
    const url = window.ttnote.baseUrl + '/projects/' + projectId + '?v1=true';
    window.ttnote.fetch(url)
      .then(res => {
        setProject(res);
        setIsLoading(false);
        projectInitial.current = JSON.parse(JSON.stringify(res));
      })
  }, [projectId]);

  useEffect(() => {
    if (projectId) {
      setIsLoading(true);
      fetchProject();
    }
  }, [projectId, fetchProject]);

  const fetchTodayTomatoSize = useCallback(() => {
    const url = window.ttnote.baseUrl + '/today_tomato_count';
    window.ttnote.fetch(url)
      .then(res => {
        setTodayTomatoSize(res.size)
      })

  }, []);

  useEffect(() => {
    fetchTodayTomatoSize()
  }, [fetchTodayTomatoSize]);

  const handleProjectChange = useCallback((params) => {
    setProject({...project, ...params});
  }, [project]);

  const projectNameChangeCancel = useCallback(() => {
    setProject({...project, name: projectInitial.current.name})
  }, [project]);

  // const handleProjectNameEnterPress = (e) => {
  //   stopEventFlag.current = true;
  //   e.currentTarget.blur();
  //   if (project.name !== projectInitial.current.name) {
  //     const value = e.currentTarget.value;
  //     if (value) {
  //       updateProject({name: value});
  //       projectDescInput.current.focus();
  //     } else {
  //       // setProject({...project, name: projectInitial.current.name})
  //       projectNameChangeCancel();
  //     }
  //   } else {
  //     projectDescInput.current.focus();
  //   }
  //   stopEventFlag.current = false;
  // };

  // const handleProjectNameOnBlur = () => {
  //   if (stopEventFlag.current) return;
  //   if (project.name !== projectInitial.current.name) {
  //     const value = project.name;
  //     if (value) {
  //       updateProject({name: value});
  //     } else {
  //       projectNameChangeCancel();
  //     }
  //   }
  // };

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

  const createTomato = useCallback((todoId, seconds) => {
    const url = window.ttnote.baseUrl + '/todos/' + todoId + '/tomatoes';
    window.ttnote.fetch(url, {
      method: 'post',
      body: JSON.stringify({minutes: window.ttnote.userSetting.tomatoMinutes})
    }).then(res => {
      // fetchProject();
      setProject(data => {
        if (data.todos[todoId]) { // 有可能已经切换成其它project的了
          data.todos[todoId].tomatoes.push(res);
        }
        return {...data}
      });
      setTodoExpandedKeys(keys => {
        keys.push(todoId);
        return [...keys];
      });
      // update today tomato size
      fetchTodayTomatoSize()
    })
  }, [fetchTodayTomatoSize]);

  const deleteTomato = useCallback((todoId, tomatoId) => {
    const url = window.ttnote.baseUrl + '/tomatoes/' + tomatoId;
    window.ttnote.fetch(url, {
      method: 'DELETE'
    })
      .then(res => {
        setProject(data => {
          const index = data.todos[todoId].tomatoes.findIndex(tomato => tomato.id === tomatoId);
          data.todos[todoId].tomatoes.splice(index, 1);
          return {...data}
        });
        // update today tomato size
        fetchTodayTomatoSize()
      })

  }, [fetchTodayTomatoSize]);

  const updateProject = useCallback((params) => {
    const url = window.ttnote.baseUrl + '/projects/' + projectId;
    window.ttnote.fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(params)
    })
      .then(res => {
        fetchProject()
      })
  }, [fetchProject, projectId]);

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

  const handleTodoNameChange = useCallback((todoId, value) => {
    setProject(data => {
      data.todos[todoId].name = value;
      return {...data}
    })
  }, []);

  const handleTitleNameChange = (titleId, value) => {
    setProject(data => {
      data.titles[titleId].name = value;
      return {...data}
    })
  };

  const handleTitleNameEnterPress = (e, titleId) => {
    stopEventFlag.current = true;
    e.currentTarget.blur();
    const value = titles[titleId].name;
    if (value) {
      if (titleId > 0) {
        const oldValue = projectInitial.current.titles[titleId].name;
        if (value !== oldValue) {
          updateTitle(titleId, {name: value});
        }
        handleNewTodo(titleId);
      } else {
        createTitle(titleId, {name: value}, handleNewTodo)
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

  const handleTodoDeleteWithConfirm = useCallback((todoId, titleId) => {
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
  }, []);

  const handleTodoDelete = useCallback((todoId, titleId) => {
    // 如果todo下面有蕃茄，就不删，返回原值
    const haveTomatoes = todos[todoId].tomatoes && todos[todoId].tomatoes.length > 0;
    if (haveTomatoes) {
      setProject(data => {
        data.todos[todoId].name = projectInitial.current.todos[todoId].name;
        return {...data}
      })
    } else {
      handleTodoDeleteWithConfirm(todoId, titleId);
    }
  }, [todos, handleTodoDeleteWithConfirm]);

  const handleTitleDeleteWithConfirm = useCallback((titleId) => {
    setProject(data => {
      const index = data.titleIds.indexOf(titleId);
      data.titleIds.splice(index, 1);
      delete data.titles[titleId];
      return {...data};
    });
    deleteTitle(titleId);
  }, []);

  const handleTitleDelete = (titleId) => {
    // 如果title下面有todo就不删，返回原值
    const haveTodos = titles[titleId].todoIds && titles[titleId].todoIds.length > 0;
    if (haveTodos) {
      setProject(data => {
        data.titles[titleId].name = projectInitial.current.titles[titleId].name;
        return {...data}
      })
    } else {
      handleTitleDeleteWithConfirm(titleId);
    }
  };

  const localReplaceTodoAfterCreate = useCallback((oldTodoId, newTodoObj) => {
    const data = cloneDeep(project);
    const index = data.todoIds.indexOf(oldTodoId);
    data.todoIds.splice(index, 1);
    data.todoIds.splice(index, 0, newTodoObj.id);
    delete data.todos[oldTodoId];
    data.todos[newTodoObj.id] = {...newTodoObj};
    setProject(data);

    projectInitial.current.todoIds.splice(index, 0, newTodoObj.id);
    projectInitial.current.todos[newTodoObj.id] = {...newTodoObj};
  }, [project]);

  const localReplaceTodoAfterCreateWithTitle = useCallback((oldTodoId, titleId, newTodoObj) => {
    const data = cloneDeep(project);
    const index = data.titles[titleId].todoIds.indexOf(oldTodoId);
    data.titles[titleId].todoIds.splice(index, 1);
    data.titles[titleId].todoIds.splice(index, 0, newTodoObj.id);
    delete data.todos[oldTodoId];
    data.todos[newTodoObj.id] = {...newTodoObj};
    setProject(data);

    projectInitial.current.titles[titleId].todoIds.splice(index, 0, newTodoObj.id);
    projectInitial.current.todos[newTodoObj.id] = {...newTodoObj};
  }, [project]);

  const createTodo = useCallback((todoId, titleId, params) => {
    const url = window.ttnote.baseUrl + `/projects/${projectId}/titles/${titleId ? titleId : '-1'}/todos`;
    window.ttnote.fetch(url, {
      method: 'POST',
      body: JSON.stringify(params)
    })
      .then(res => {
        console.log(res);
        // fetchProject();
        console.log('init -1: ', projectInitial.current);
        if (titleId) {
          localReplaceTodoAfterCreateWithTitle(todoId, titleId, res)
        } else {
          localReplaceTodoAfterCreate(todoId, res)
        }

      }).catch(res => {
      // todo
    })
  }, [localReplaceTodoAfterCreateWithTitle, localReplaceTodoAfterCreate, projectId]);

  const handleTodoNameEnterPress = useCallback((e, todoId, titleId) => {
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
  }, [createTodo, handleTodoDelete, todos]);

  const handleTodoNameOnBlur = useCallback((todoId, titleId) => {
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
  }, [createTodo, handleTodoDelete, todos]);

  const createTitle = (titleId, params, callback) => {
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
        });
        if (callback) callback(res.id);
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
    projectInitial,
    isLoading,
    handleNewTodo,
    handleNewTitle,
    todoExpandedKeys,
    setTodoExpandedKeys,
    todayTomatoSize,
    projectMethods: {
      handleProjectChange,
      handleProjectDescOnBlur,
      handleProjectDescEnterPress,
      projectNameChangeCancel,
      updateProject,
    },
    todoMethods: {
      handleTodoNameChange,
      handleTodoNameOnBlur,
      handleTodoNameEnterPress,
      createTomato,
      deleteTomato,
      handleTodoDeleteWithConfirm,
    },
    titleMethods: {
      handleTitleNameChange,
      handleTitleNameEnterPress,
      handleTitleDeleteWithConfirm,
    },
  }
}

export default useProject;