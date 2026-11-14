import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Input } from '../atoms';
import { InputGroup, InputGroupAddon } from './InputGroup';

const meta = { title: 'Molecules/InputGroup', component: InputGroup, decorators: [(Story) => <div style={{ maxWidth: 360, display: 'grid', gap: 12 }}><Story /></div>] } satisfies Meta<typeof InputGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

export const PrefixAndSuffix: Story = { render: () => <InputGroup><InputGroupAddon>$</InputGroupAddon><Input variant="cell" aria-label="Budget" defaultValue="9.84" /><InputGroupAddon>per test</InputGroupAddon></InputGroup> };
export const WithButton: Story = { render: () => <InputGroup><InputGroupAddon>https://</InputGroupAddon><Input variant="cell" aria-label="Registry URL" placeholder="registry.example" /><Button>Check</Button></InputGroup> };
