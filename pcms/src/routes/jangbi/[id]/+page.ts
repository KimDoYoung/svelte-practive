import type { PageLoad } from './$types';
import { API_BASE_URL } from '$lib/pcms_config';
import type { JangbiDetailResponse} from '$lib/types';
import { displayYmd } from '$lib/utils';

export const load: PageLoad = async ({ params, fetch }) => {
  // 기본 URL 설정
  let data: JangbiDetailResponse = {} as JangbiDetailResponse;
  const id = params.id;
  const url = `${API_BASE_URL}/jangbi/${id}`;
  console.log('url:', url);
  if (id == '0') {
    return data; 
  }
  // 데이터 fetch
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch jangbi : ${res.statusText}`);
  }
  data = await res.json();
  data.ymd = displayYmd(data.ymd);
  console.log('data:', data);
  return data;
};

