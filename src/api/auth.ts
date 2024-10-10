import { supabase } from './config';

interface auth {
  email: string;
  password: string;
  displayName?: string;
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
export const signUpNewUser = async ({ email, password, displayName, fullName }: auth) => {
  // Sign up through supabase
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        display_name: displayName,
        full_name: fullName
      }
    },
  });

  if (error) {
    console.error('Error: ', error);

    return { data: null, error };
  }

  return { data, error: null }
}

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
