<script lang="ts">
    import { onMount } from 'svelte';
    import Tree from 'tui-tree';
    import 'tui-tree/dist/tui-tree.css';

    let tree: unknown ; // 초기값 설정
    onMount(() => {
        const container = document.getElementById('tree') as HTMLElement;
        const treeData = [
            {
                text: '언어',
                children: [
                { text: '영어', code: 'eng' },
                { text: '한국어', code: 'kor' },
                {
                    text: '컴퓨터 언어',
                    state: 'closed', // 상태는 "closed" 또는 "opened"만 가능
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
            nodeDefaultState: 'opened'
        };    
        tree = new Tree(container, options);
    });
</script>
1111
<div id="tree" class="tui-tree-wrap"></div>

<style>

</style>