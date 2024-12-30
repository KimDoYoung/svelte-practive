import type { PageLoad } from './$types';
import type { EssayListResponse } from '$lib/types';
import { API_BASE_URL } from '$lib/pcms_config';
// import { getFetch } from '$lib/api';

export const load: PageLoad = async ({  fetch }) => {
  // 기본 URL 설정
  const url = `${API_BASE_URL}/essays?title_only=true`;
  //const url = `${API_BASE_URL}/essays`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch essay: ${res.statusText}`);
  }
  const data: EssayListResponse = await res.json();
  console.log('data:', data);
  return data;

};

