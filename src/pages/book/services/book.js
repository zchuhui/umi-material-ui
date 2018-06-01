import request from '../../../utils/request';

export function search(payload) {
  return request(`/api/book/search?q=${payload.q}`);
}
