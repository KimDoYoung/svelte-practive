// src/routes/+page.server.ts
import { redirect } from '@sveltejs/kit';

export function load() {
    // 루트('/')에 접근 시 /main으로 리디렉션
    throw redirect(307, '/main');
}
