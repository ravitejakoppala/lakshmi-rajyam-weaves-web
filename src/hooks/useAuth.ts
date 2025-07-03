import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  address: string;
  avatar_url?: string;
  is_verified: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile
          setTimeout(async () => {
            await fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfile(data);
        // Update last login
        await supabase
          .from('profiles')
          .update({ last_login: new Date().toISOString() })
          .eq('id', userId);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const signUp = async (email: string, password: string, userData: {
    full_name: string;
    phone: string;
    address: string;
  }, securityQuestion: { question: string; answer: string }) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: userData.full_name,
            phone: userData.phone,
            address: userData.address
          }
        }
      });

      if (error) return { error };

      // Create security question if user was created
      if (data.user) {
        // Hash the answer for security
        const answerHash = await hashSecurityAnswer(securityQuestion.answer);
        
        await supabase
          .from('security_questions')
          .insert({
            user_id: data.user.id,
            question: securityQuestion.question,
            answer_hash: answerHash
          });
      }

      return { data, error: null };
    } catch (error: any) {
      return { error: { message: error.message } };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) return { error };
      return { data, error: null };
    } catch (error: any) {
      return { error: { message: error.message } };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        setUser(null);
        setProfile(null);
        setSession(null);
      }
      return { error };
    } catch (error: any) {
      return { error: { message: error.message } };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const redirectUrl = `${window.location.origin}/reset-password`;
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl
      });

      return { error };
    } catch (error: any) {
      return { error: { message: error.message } };
    }
  };

  const verifySecurityAnswer = async (email: string, answer: string) => {
    try {
      // Get user by email
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();

      if (profileError || !profiles) {
        return { error: { message: 'User not found' } };
      }

      // Get security question
      const { data: securityData, error: securityError } = await supabase
        .from('security_questions')
        .select('*')
        .eq('user_id', profiles.id)
        .single();

      if (securityError || !securityData) {
        return { error: { message: 'Security question not found' } };
      }

      // Verify answer
      const answerHash = await hashSecurityAnswer(answer);
      if (answerHash === securityData.answer_hash) {
        return { success: true, question: securityData.question };
      } else {
        return { error: { message: 'Incorrect security answer' } };
      }
    } catch (error: any) {
      return { error: { message: error.message } };
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: { message: 'No user logged in' } };

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) return { error };

      setProfile(data);
      return { data, error: null };
    } catch (error: any) {
      return { error: { message: error.message } };
    }
  };

  const hashSecurityAnswer = async (answer: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(answer.toLowerCase().trim());
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };

  return {
    user,
    profile,
    session,
    loading,
    isLoggedIn: !!user,
    signUp,
    signIn,
    signOut,
    resetPassword,
    verifySecurityAnswer,
    updateProfile
  };
};