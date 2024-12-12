import type { PageLoad} from "./$types";
import { API_BASE_URL } from '$lib/pcms_config';
// import { getFetch } from "$lib/api";

export const load: PageLoad = async (params, fetch) => {
  const url = '/movie_reviews';
  const res = await fetch(`${API_BASE_URL}/${url}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch movie reviews: ${res.statusText}`);
  }
  const data = await res.json();
  return { props: { data } };

};
