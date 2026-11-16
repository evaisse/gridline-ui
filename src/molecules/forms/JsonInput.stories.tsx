import type { Meta, StoryObj } from '@storybook/react-vite';
import { JsonInput } from './JsonInput';

const meta = { title: 'Molecules/Forms/JsonInput', tags: ['input', 'code'], component: JsonInput, args: { 'aria-label': 'Package manifest' }, decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>] } satisfies Meta<typeof JsonInput>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = { args: { placeholder: '{ "name": "tessera" }' } };
export const Valid: Story = { args: { defaultValue: '{"name":"tessera","version":"2.4.0","keywords":["parser","stream"]}' } };
export const Invalid: Story = { args: { defaultValue: '{"name": "quillmark", "version": }' } };
export const Disabled: Story = { args: { disabled: true, defaultValue: '{ "name": "castor" }' } };
