import request from '../utils/request';

function editTodo(id, data, showSync) {
  return request({
    url: `todos/${id}`,
    method: 'patch',
    data,
    showSync
  });
}

function saveDailyNote(id, data, showSync) {
  return request({
    url: `daily_notes/${id}`,
    method: 'put',
    data,
    showSync
  });
}

export default { editTodo, saveDailyNote };
