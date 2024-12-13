
import type { PageLoad } from './$types';
import { API_BASE_URL } from '$lib/pcms_config';
import type { MovieReviewListResponse } from '$lib/types';

export const load: PageLoad = async ({ fetch }) => {
  // 기본 URL 설정
  const url = `${API_BASE_URL}/movie_reviews`;
  console.log('url:', url);
  // 데이터 fetch
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch movie reviews: ${res.statusText}`);
  }

  const data: MovieReviewListResponse = await res.json();
  console.log('data:', data);
  return data;
};
