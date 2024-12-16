import type { PageLoad } from './$types';
import { API_BASE_URL } from '$lib/pcms_config';
import type { MovieDvdListResponse } from '$lib/types';

export const load: PageLoad = async ({ fetch }) => {
  // 기본 URL 설정
  const url = `${API_BASE_URL}/movies`;
  console.log('url:', url);
  // 데이터 fetch
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch movie reviews: ${res.statusText}`);
  }

  const data: MovieDvdListResponse = await res.json();
  console.log('data:', data);
  return data;
};