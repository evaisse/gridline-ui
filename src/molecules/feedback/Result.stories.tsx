import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../atoms';
import { Result } from './Result';

const meta = { title: 'Molecules/Feedback/Result', tags: ['status', 'message', 'page'], component: Result } satisfies Meta<typeof Result>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = { args: { status: 'success', title: 'tessera 2.4.0 published', description: 'The tarball passed all checks and is live on the registry.', actions: <><Button variant="solid">View package</Button><Button>Publish another</Button></> } };
export const Failure: Story = {
  args: {
    status: 'error', title: 'Publish failed', description: 'The registry rejected the upload.',
    children: <ul style={{ margin: 0, paddingLeft: 16 }}><li>Version 2.4.0 already exists.</li><li>Missing licence field in manifest.</li></ul>,
    actions: <Button>Try again</Button>,
  },
};
export const Forbidden: Story = { args: { status: 'forbidden', title: 'You cannot publish here', description: 'Ask an owner of quillmark to add you as a maintainer.', actions: <Button>Request access</Button> } };
export const NotFound: Story = { args: { status: 'not-found', title: 'No such package', description: 'castor-legacy was removed or never existed.' } };
