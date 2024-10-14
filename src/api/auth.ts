import { supabase } from './config';

interface auth {
  email: string;
  password: string;
  userName?: string;
  fullName?: string;
}

// User login
export const signIn = async ({ email, password }: auth) => {
  // Login through supabase
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.error('Error: ', error);

    return { data: null, error };
  }

  const { user, session } = data;

  return { user, session, error };
};

// Create new user
export const signUpNewUser = async ({
  email,
  password,
  userName,
  fullName,
}: auth) => {
  // Sign up through supabase
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        user_name: userName,
        full_name: fullName,
      },
    },
  });

  const { data: userData, error: userError } = await supabase
    .from('users')
    .insert({
      email: email,
      username: userName,
    })
    .select();

  if (error) {
    console.error('Error: ', error);

    return { data: null, error, userError };
  }

  return { data, userData, error: null, userError: null };
};

// Get all user data
export const getUser = async () => {
  const { data, error } = await supabase.from('users').select('*');

  if (error) {
    console.error('Error: ', error);

    return { data: null, error };
  }

  return { data, error: null };
};

// User logout
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  return error;
};

//Get user session
export const getUserSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Error: ', error);

    return { data: null, error };
  }

  return { data, error: null };
};
