<script lang="ts">
  import { onMount } from 'svelte';
  // import Tree from 'tui-tree';
  import 'tui-tree/dist/tui-tree.css';

  let tree: unknown ; // 초기값 설정
  onMount(async () => {
    const { default: Tree } = await import('tui-tree'); // 클라이언트에서만 동적 로드
    import('tui-tree/dist/tui-tree.css'); // CSS는 SSR에 영향을 주지 않음

    const container = document.getElementById('tree') as HTMLElement;

    if (!container) {
      console.error("Container with ID 'tree' not found");
      return;
    }

    const treeData = [
      {
        text: '언어',
        children: [
          { text: '영어', code: 'eng' },
          { text: '한국어', code: 'kor' },
          {
            text: '컴퓨터 언어',
            state: 'closed',
            children: [
              { text: '자바', code: 'java' },
              { text: 'C언어', code: 'c' },
            ],
          },
        ],
      },
    ];

    const options = {
      data: treeData,
      nodeDefaultState: 'opened',
    };

    tree = new Tree(container, options); // Tree 인스턴스 생성
  });
</script>
1111
<div id="tree" class="tui-tree-wrap"></div>

<style>

</style>