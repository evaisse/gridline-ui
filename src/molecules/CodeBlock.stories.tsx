import type { Meta, StoryObj } from '@storybook/react-vite';
import { CodeBlock } from './CodeBlock';

const meta = {
  title: 'Molecules/CodeBlock',
  component: CodeBlock,
  args: { title: 'parse.ts', lineNumbers: true, code: "import { parse } from 'tessera';\n\nconst tree = parse(source, { recover: true });\nconsole.log(tree.errors.length);\n" },
  decorators: [(Story) => <div style={{ maxWidth: 560 }}><Story /></div>],
} satisfies Meta<typeof CodeBlock>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Code: Story = {};
export const Terminal: Story = { args: { title: 'Terminal', lineNumbers: false, code: '$ npm run check\n> typecheck  ok\n> lint       ok\n> boundaries 34/34\n' } };
export const Diff: Story = { args: { title: 'eslint.config.js', diff: true, lineNumbers: false, code: " const CHAIN = ['atoms', 'molecules'];\n-const STRICT_CHAIN = false;\n+const STRICT_CHAIN = true;\n export default config;\n" } };
