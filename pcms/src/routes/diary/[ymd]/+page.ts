import type { PageLoad } from './$types';
import { API_BASE_URL } from '$lib/pcms_config';
import type { DiaryDetailResponse} from '$lib/types';
export const load: PageLoad = async ({ params, fetch }) => {
  // 기본 URL 설정
  const ymd = params.ymd;
  const url = `${API_BASE_URL}/diary/${ymd}`;
  console.log('url:', url);
  // 데이터 fetch
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch snote : ${res.statusText}`);
  }
  const diaryDetail : DiaryDetailResponse = await res.json();
  const data  = {
    diary : diaryDetail,
    ymd : ymd
  }
  console.log('data:', data);
  return data;
};