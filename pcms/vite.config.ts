import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    // 기본 모드는 `.env.local`을 사용하고, 프로덕션 모드는 `.env.real`을 사용
    const envFile = mode === 'product' ? '.env.product' : '.env.development';

    // 선택한 환경 파일을 로드하여 환경 변수에 추가
    const env = loadEnv(mode, process.cwd(), envFile);

    // Vite 설정 반환
    return {
        plugins: [sveltekit()],
        define: {
            // 환경 변수를 애플리케이션에서 사용할 수 있도록 노출
            'process.env': Object.fromEntries(
                Object.entries(env).map(([key, val]) => [`process.env.${key}`, val])
            )
        }
    };
});