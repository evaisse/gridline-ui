import type { Meta, StoryObj } from '@storybook/react-vite';
import { AvatarGroup } from './AvatarGroup';

const people = ['ic', 'jw', 'ad', 'ph', 'sl', 'tr', 'hs'].map((fallback) => ({ fallback }));
const meta = { title: 'Molecules/Data display/AvatarGroup', tags: ['identity'], component: AvatarGroup, args: { people } } satisfies Meta<typeof AvatarGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Large: Story = { args: { size: 'lg', max: 3 } };
export const All: Story = { args: { max: 10 } };
