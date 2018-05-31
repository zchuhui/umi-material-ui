import request from '../../../utils/request';

export function search(payload) {
  return request(`/api/search?q=${payload.q}`);
}
