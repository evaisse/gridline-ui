import type { Meta, StoryObj } from '@storybook/react-vite';
import { Blockquote, Button, Label, Link } from '../atoms';
import { AuthForm } from '../organisms';
import { AuthTemplate } from '../templates';

function SignIn() {
  return (
    <AuthTemplate
      brand={<Label tone="ink">◆ Gridline Registry</Label>}
      footer={<Label size="xs">© 2026 Gridline · invented company</Label>}
      aside={
        <div style={{ display: 'grid', gap: 12, maxWidth: 480 }}>
          <Blockquote>We replaced three dependencies in a week. For the first time the discussion was about numbers everyone could see.</Blockquote>
          <Label>Ines Carvalho · Platform lead, Tessera Labs</Label>
        </div>
      }
    >
      <AuthForm
        description="Use the email address of your organisation."
        providers={<><Button>Single sign-on</Button><Button>Passkey</Button></>}
        footer={<>No account yet? <Link href="#">Create one</Link> · <Link href="#">Forgot your password?</Link></>}
      />
    </AuthTemplate>
  );
}

const meta = { title: 'Pages/Sign in', component: SignIn, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof SignIn>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
