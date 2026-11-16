import type { Meta, StoryObj } from '@storybook/react-vite';
import { SmartPaste, type SmartPasteValues } from './SmartPaste';

/** A toy parser for "key: value" lines, standing in for a real extractor. */
const extract = (text: string): SmartPasteValues =>
  Object.fromEntries(text.split('\n').map((line) => line.split(/:\s*/)).filter((parts) => parts.length === 2 && parts[0] && parts[1]));

const sample = 'name: tessera\nversion: 3.1.0\nlicence: MIT\nmaintainer: registry-team';
const labels = { name: 'Package', version: 'Version', licence: 'Licence', maintainer: 'Maintainer' };

const meta = { title: 'Organisms/Assistant/SmartPaste', tags: ['ai', 'form', 'action'], component: SmartPaste, args: { extract, labels, text: sample } } satisfies Meta<typeof SmartPaste>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Proposal: Story = { args: { defaultProposal: { name: 'tessera', version: '3.1.0', licence: 'MIT', maintainer: 'registry-team' } } };
export const NothingFound: Story = { args: { text: 'no structured data in here' } };
