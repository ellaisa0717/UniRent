import React, { createContext, useContext, useState } from 'react';

// 1. Create the context
const UserContext = createContext();

// 2. Create the provider
export function UserProvider({ children }) {
  // This is our dummy user. In a real app with Supabase,
  // this data would come from your database when the user logs in.
  const [user, setUser] = useState({
    name: 'Justin Nabunturan',
    email: 'justin@ustp.edu.ph',
    student_id: '2019123456',
    isVerified: false,  // <-- THE IMPORTANT FLAG
    isPending: false,   // <-- 'true' after they submit
  });

  // This function simulates submitting for verification
  const submitForVerification = () => {
    // In a real app, this would upload the ID to Supabase Storage
    // and set the user's status in the database to "pending".
    console.log('Submitting for verification...');
    setUser(prevUser => ({
      ...prevUser,
      isPending: true, // Set status to pending
    }));
  };

  // 3. Provide these values to all children
  const value = {
    user,
    isVerified: user.isVerified,
    isPending: user.isPending,
    submitForVerification,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// 4. Create a custom hook to easily use the context
export const useUser = () => {
  return useContext(UserContext);
};