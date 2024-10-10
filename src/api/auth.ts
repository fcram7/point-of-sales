import { supabase } from './config';

interface auth {
  email: string;
  password: string;
  displayName?: string;
  fullName?: string;
}

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

// export const signUpNewUser = async ({ email, password, displayName, fullName }: auth) => {
//   const { data, error } = await supabase.auth.signUp({
//     email: email,
//     password: password,
//     options: {
//       data: {
//         display_name: displayName,
//         full_name: fullName
//       }
//     },
//   });

//   if (error) {
//     console.error('Error: ', error);

//     return { data: null, error };
//   }

//   return { data, error: null }
// }

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  return error;
};

export const getUserSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Error: ', error);

    return { data: null, error };
  }

  return { data, error: null };
};
