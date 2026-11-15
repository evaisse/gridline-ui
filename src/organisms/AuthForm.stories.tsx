import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Link } from '../atoms';
import { AuthForm } from './AuthForm';

const meta = {
  title: 'Organisms/Forms/AuthForm', tags: ['auth', 'form'], component: AuthForm,
  args: { description: 'Use the email address of your organisation.', footer: <>No account yet? <Link href="#">Create one</Link></> },
} satisfies Meta<typeof AuthForm>;
export default meta;
type Story = StoryObj<typeof meta>;

export const SignIn: Story = {};
export const SignUp: Story = { args: { mode: 'sign-up', description: undefined, footer: <>Already registered? <Link href="#">Sign in</Link></> } };
export const WithError: Story = { args: { error: 'Email or password is incorrect' } };
export const WithProviders: Story = { args: { providers: <><Button>Single sign-on</Button><Button>Passkey</Button></> } };
