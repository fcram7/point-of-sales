import { supabase } from './config';

interface auth {
  email: string;
  password: string;
}

export const signIn = async ({ email, password }: auth) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  const { user, session } = data;

  return { user, session, error };
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  return error;
}