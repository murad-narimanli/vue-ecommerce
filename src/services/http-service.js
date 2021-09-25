import instance from "../api";

export function getRequest(url, query) {
  return instance.get(url, { params: {...query , } });
}

export function postRequest(url, params ,query) {
  return instance.post(url, params , {params: {...query}});
}

export function putRequest(url, params , query) {
  return instance.put(url , params , {params: {...query}} );
}

export function deleteRequest(url, query) {
  return instance.delete(url ,{ params: {...query }});
}

export function patchRequest(url, params ,query) {
  return instance.patch(url, params , {params:  {...query }});
}

