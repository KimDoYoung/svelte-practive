import type { PageLoad } from './$types';
import { API_BASE_URL } from '$lib/pcms_config';
import type { xxxResponse} from '$lib/types';

export const load: PageLoad = async ({ params, fetch }) => {
  // 기본 URL 설정
  getFetch(url).then((data) => {
    console.log('data:', data);
    return data;
  }
};