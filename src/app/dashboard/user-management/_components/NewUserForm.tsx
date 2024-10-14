import { InputComponent } from '@/components/Input';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { newUserSchema } from '@/utils/schema/NewUserSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface newUserForm {
  handleSubmit: (values: z.infer<typeof newUserSchema>) => void;
}

export const NewUserForm = ({ handleSubmit }: newUserForm) => {
  const form = useForm<z.infer<typeof newUserSchema>>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      password: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 mt-4 w-full flex flex-col gap-6 items-center'>
        <div className='new-user-form__content grid gap-4 w-[30%]'>
          <FormField
            control={form.control}
            name='fullName'
            render={({ field }) => (
              <InputComponent
                field={field}
                inputLabel='Full Name'
                inputPlaceholder='Please enter your full name'
                inputType='text'
                disabled={false}
                onChangeHandler={(e) => field.onChange(e.target.value)}
                required
              />
            )}
          />
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <InputComponent
                field={field}
                inputLabel='Username'
                inputPlaceholder='Please enter your username'
                inputType='text'
                disabled={false}
                onChangeHandler={(e) => field.onChange(e.target.value)}
                required
              />
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <InputComponent
                field={field}
                inputLabel='Email'
                inputPlaceholder='Please enter your email'
                inputType='email'
                disabled={false}
                onChangeHandler={(e) => field.onChange(e.target.value)}
                required
              />
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <InputComponent
                field={field}
                inputLabel='Password'
                inputPlaceholder='Please enter your password'
                inputType='password'
                disabled={false}
                onChangeHandler={(e) => field.onChange(e.target.value)}
                required
              />
            )}
          />
        </div>
        <Button type='submit'>Create New User</Button>
      </form>
    </Form>
  );
};
