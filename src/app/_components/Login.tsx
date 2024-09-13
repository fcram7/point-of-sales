'use client';

import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { InputComponent } from '@/components/Input';
import { loginFormSchema } from '@/utils/schema/LoginSchema';
import { signIn } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

export const Login = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmitHandler = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      await signIn({
        email: values.email,
        password: values.password,
      });

      toast({
        title: 'Successfully Logged In',
        action: (
          <ToastAction altText='Click to close notification'>Close</ToastAction>
        ),
      });
      router.push('/dashboard');
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };
  return (
    <section className='login-section border-2 border-slate-300 min-w-fit w-[40%] rounded-lg'>
      <div className='login-section__content p-6'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className='space-y-8'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <InputComponent
                  inputLabel='Email'
                  inputPlaceholder='insert your email'
                  inputType='email'
                  field={field}
                  disabled={false}
                  required
                  onChangeHandler={(e) => field.onChange(e.target.value)}
                />
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <InputComponent
                  inputLabel='Password'
                  inputPlaceholder='insert your password'
                  inputType='password'
                  field={field}
                  disabled={false}
                  required
                  onChangeHandler={(e) => field.onChange(e.target.value)}
                />
              )}
            />

            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      </div>
    </section>
  );
};
