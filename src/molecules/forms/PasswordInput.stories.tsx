import type { Meta, StoryObj } from '@storybook/react-vite';
import { PasswordInput } from './PasswordInput';

const meta = { title: 'Molecules/Forms/PasswordInput', tags: ['input', 'auth'], component: PasswordInput, args: { defaultValue: 'correct horse', 'aria-label': 'Password' }, decorators: [(Story) => <div style={{ maxWidth: 320 }}><Story /></div>] } satisfies Meta<typeof PasswordInput>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
