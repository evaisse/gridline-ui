import type { FormEvent, ReactNode } from 'react';
import { Button, Checkbox, Heading, Input, Label, Text } from '../atoms';
import { Alert, Field, PasswordInput } from '../molecules';
import { cx } from '../utils/cx';
import './AuthForm.css';

export interface AuthFormProps {
  mode?: 'sign-in' | 'sign-up';
  title?: ReactNode;
  description?: ReactNode;
  /** A message above the fields, e.g. wrong credentials. */
  error?: ReactNode;
  /** Receives the field values. The form does no validation of its own beyond `required`. */
  onSubmit?: (values: { name?: string; email: string; password: string; remember: boolean }) => void;
  /** Buttons for other sign-in methods, shown under a ruled separator. */
  providers?: ReactNode;
  /** A line under the form: link to the other mode, legal text. */
  footer?: ReactNode;
  busy?: boolean;
  className?: string;
}

/** A sign-in or sign-up card: fields, one primary button, optional other methods. */
export function AuthForm({ mode = 'sign-in', title, description, error, onSubmit, providers, footer, busy = false, className }: AuthFormProps) {
  const signUp = mode === 'sign-up';
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSubmit?.({ name: signUp ? String(data.get('name') ?? '') : undefined, email: String(data.get('email') ?? ''), password: String(data.get('password') ?? ''), remember: data.get('remember') === 'on' });
  };

  return (
    <form className={cx('gl-auth-form', className)} onSubmit={submit}>
      <div className="gl-auth-form__head">
        <Heading level={1} size="xl">{title ?? (signUp ? 'Create an account' : 'Sign in')}</Heading>
        {description != null && <Text tone="muted">{description}</Text>}
      </div>
      <div className="gl-auth-form__body">
        {error != null && <Alert tone="neg" title={error} />}
        {signUp && <Field label="Name">{(ids) => <Input {...ids} name="name" autoComplete="name" required />}</Field>}
        <Field label="Email">{(ids) => <Input {...ids} name="email" type="email" autoComplete="email" required />}</Field>
        <Field label="Password" description={signUp ? 'At least 12 characters.' : undefined}>
          {(ids) => <PasswordInput {...ids} name="password" autoComplete={signUp ? 'new-password' : 'current-password'} minLength={signUp ? 12 : undefined} required />}
        </Field>
        {!signUp && <label className="gl-auth-form__remember"><Checkbox name="remember" aria-label="Keep me signed in" /><Text variant="small">Keep me signed in</Text></label>}
        <Button type="submit" variant="solid" disabled={busy}>{busy ? 'Please wait' : signUp ? 'Create account' : 'Sign in'}</Button>
        {providers != null && (
          <>
            <div className="gl-auth-form__or"><Label size="xs">Or continue with</Label></div>
            <div className="gl-auth-form__providers">{providers}</div>
          </>
        )}
      </div>
      {footer != null && <div className="gl-auth-form__foot">{footer}</div>}
    </form>
  );
}
