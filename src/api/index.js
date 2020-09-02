import request from '../utils/request';

function editTodo(id, data, showSync) {
  return request({
    url: `todos/${id}`,
    method: 'patch',
    data,
    showSync,
  });
}

export default { editTodo };
