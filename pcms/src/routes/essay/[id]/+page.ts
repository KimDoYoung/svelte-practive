import type { PageLoad } from './$types';
import { API_BASE_URL } from '$lib/pcms_config';
import type { EssayBase } from '$lib/types';

export const load: PageLoad = async ({ params, fetch }) => {
  if (params.id == "0" ) {
    return {
      id : 0,
      title : "새 글",
      content : "",
      create_dt : undefined,
      lastmodify_dt : undefined
    };
  }
  // 기본 URL 설정
  const id = params.id;
  const url = `${API_BASE_URL}/essay/${id}`;
  console.log('url:', url);
  // 데이터 fetch
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch snote : ${res.statusText}`);
  }
  const data: EssayBase = await res.json();
  console.log('data:', data);
  return data;
};