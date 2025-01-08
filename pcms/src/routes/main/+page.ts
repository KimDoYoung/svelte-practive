import type { PageLoad } from './$types';
import { API_BASE_URL } from '$lib/pcms_config';
import type { TodoBase } from '$lib/types';
export const load: PageLoad = async ({  fetch }) => {
  const url = `${API_BASE_URL}/todo`;
  console.log('url:', url);
  // 데이터 fetch
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch snote : ${res.statusText}`);
  }
  const list: TodoBase[] = await res.json();
  console.log('data:', list);
  // return data;
  const data = {
    list: list
  }
  return data;
  // return {
  //   props: {
  //     todos: data
  //   }
  // }  
};