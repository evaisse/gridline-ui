import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../atoms';
import { ErrorTemplate } from '../templates';
import { ArrowRightIcon, RefreshIcon } from '../tokens/icons';

const meta = { title: 'Pages/Not found', component: ErrorTemplate, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof ErrorTemplate>;
export default meta;
type Story = StoryObj<typeof meta>;

export const NotFound: Story = {
  args: { code: '404', title: 'This page does not exist', description: 'The package may have been renamed or unpublished. Check the address or search the catalogue.', actions: <><Button variant="solid" icon={<ArrowRightIcon />}>Back to the catalogue</Button><Button>Search</Button></>, detail: 'Request 7f3a-21c9 · Nov 15, 2026 14:02 UTC' },
};
export const ServerError: Story = {
  args: { code: '500', title: 'Something failed on our side', description: 'The error has been recorded. Trying again in a minute usually works.', actions: <><Button variant="solid" icon={<RefreshIcon />}>Try again</Button><Button>Platform status</Button></>, detail: 'Request 9b1e-44d0' },
};
export const Maintenance: Story = {
  args: { code: '—', title: 'Back at 04:00 UTC', description: 'The registry is read-only while we move the index. Installs keep working.', actions: <Button>Platform status</Button> },
};
