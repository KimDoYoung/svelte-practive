/**
 * @type {import('@sveltejs/kit').Load}
 * snote view
 * 암호를 해독해서 본문을 보여준다.
 */

import type { PageLoad } from './$types';
import { API_BASE_URL } from '$lib/pcms_config';
import type { SnoteResponse } from '$lib/types';
import { SnoteCrypto } from "$lib/utils/snote_crypto";

export const load: PageLoad = async ({ params, fetch }) => {
  // 기본 URL 설정
  const id = params.snote_id;
  const url = `${API_BASE_URL}/snote/${id}`;
  console.log('url:', url);
  // 데이터 fetch
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch snote : ${res.statusText}`);
  }

  const response: SnoteResponse = await res.json();
  const snote_parsed = SnoteCrypto.parse(response.note);
  const data =  {
    id : response.id,
    title : response.title,
    hint : snote_parsed.hint,
    hashPassword : snote_parsed.hashPassword,
    encryptedText : snote_parsed.encryptedText,
  }
  console.log('data:', data);
  return data;

};
