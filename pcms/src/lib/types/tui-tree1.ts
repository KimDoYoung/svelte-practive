declare module 'tui-tree' {
  export default class Tree {
    constructor(container: HTMLElement, options: TreeOptions);
    on(event: string, handler: (event: unknown) => void): void;
    getNodeData(nodeId: string): unknown;
    getNodes(): unknown[];
    removeNode(nodeId: string): void;
    reset(): void;
    // 필요한 메서드 추가
  }

  interface TreeOptions {
    data: TreeNode[];
    nodeDefaultState?: 'opened' | 'closed' | string; // string 추가로 모든 문자열 허용
  }

  interface TreeNode {
    text: string;
    children?: TreeNode[];
    state?: 'opened' | 'closed' | string; // string 추가로 모든 문자열 허용
    code?: string;
  }
}