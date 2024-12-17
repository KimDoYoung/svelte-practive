<!-- src/routes/+layout.svelte -->
<script lang="ts">
    import "$lib/styles/global.css";
    import { page } from '$app/stores';
    import NavBar from '$lib/components/NavBar.svelte';
    const titles: Record<string, string> = {
      '/': '',
      '/diary': 'Diary',
      '/calendar': 'Calendar',
      '/snote/edit': 'Snote-Edit',
      '/snote': 'Snote',
      '/movie/review': 'Movie Review',
      '/movie/dvd': 'Movie DVD',
      '/movie/hdd': 'Movie HDD',
      '/jangbi': 'Jangbi',
    };
    console.log("$page.url.pathname:",$page.url.pathname);
    const currentPageTitle = $derived.by(() => {
      const pathname = $page.url.pathname;

      // '/' 단일 문자열은 우선순위로 처리
      if (pathname === '/') {
        return titles['/'];
      }

      // startsWith 조건에 맞는 키를 찾아 반환
      const foundKey = Object.keys(titles).find(key => 
        key !== '/' && pathname.startsWith(key) // '/' 제외하고 startsWith로 매칭
      );

      // 찾은 키에 해당하는 타이틀 반환, 없으면 빈 문자열 반환
      return foundKey ? titles[foundKey] : '';
    });
</script>

<main class="container">
    <NavBar {currentPageTitle} />
    <slot/>
</main>