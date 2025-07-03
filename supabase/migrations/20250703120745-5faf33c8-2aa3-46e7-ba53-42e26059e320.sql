-- Add security questions table for password recovery
CREATE TABLE public.security_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Enable RLS
ALTER TABLE public.security_questions ENABLE ROW LEVEL SECURITY;

-- Create policies for security questions
CREATE POLICY "Users can manage own security questions" 
ON public.security_questions 
FOR ALL 
USING (user_id IN (SELECT id FROM public.profiles WHERE id = auth.uid()));

-- Update profiles table to store additional security info
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS last_login TIMESTAMP WITH TIME ZONE;

-- Create trigger for security questions updated_at
CREATE TRIGGER update_security_questions_updated_at 
BEFORE UPDATE ON public.security_questions 
FOR EACH ROW 
EXECUTE FUNCTION public.update_updated_at_column();