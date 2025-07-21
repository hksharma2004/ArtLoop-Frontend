import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GlowyCard } from '@/components/GlowyCard';
import { GlowyCardWrapper } from '@/components/GlowyCardWrapper';
import { toast } from 'sonner';
import { FlickeringGrid } from '@/components/magicui/flickering-grid';


import { account } from '@/services/appwrite';

import { loginUserAPI, registerUserAPI } from '@/services/api';

interface User {
  $id: string;
  name: string;
  email: string;
  prefs: { remainingGenerations?: number };
}

interface AuthProps {
  onLoginSuccess: (userData: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(location.state?.isSignUp === false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location.state?.isSignUp !== undefined) setIsLogin(!location.state.isSignUp);
  }, [location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let apiResponse;

      if (isLogin) {
        apiResponse = await loginUserAPI({
          email: formData.email,
          password: formData.password,
        });
        toast.success('Logged in successfully!');
      } else {
        apiResponse = await registerUserAPI({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        toast.success('Account created successfully!');
      }

      localStorage.setItem('token', apiResponse.token);

      await account.createEmailPasswordSession(formData.email, formData.password);
      const authUser = await account.get();

      const appUser = {
        ...authUser,
        prefs: { ...authUser.prefs, remainingGenerations: apiResponse.remainingGenerations }
      };

      onLoginSuccess(appUser as User);
      navigate('/workspace');

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Authentication error:', error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GlowyCardWrapper hue={280} size={300} border={2} radius={12}>
      <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
        <FlickeringGrid className="absolute inset-0 z-0 size-full" color="#FFFFFF" maxOpacity={0.15} flickerChance={0.05}/>
        <div className="relative z-10 w-full max-w-md">
          <GlowyCard>
            <Card className="bg-gray-900/50 border-gray-800 text-white p-6 sm:p-8">
              <CardHeader className="text-center p-0 mb-8">


                <div 
                  className="flex flex-col items-center justify-center mb-4 cursor-pointer group"
                  onClick={() => navigate('/')}
                >
                  <img src="/artloop_logo.svg" className="h-10 w-10 -mb-0.5 transition-transform duration-300 group-hover:scale-110" alt="ArtLoop Logo" />
                  <span className="text-lg font-serif font-bold transition-colors duration-300 group-hover:text-gray-300">ArtLoop</span>
                </div>

                <CardTitle className="text-5xl font-serif font-bold leading-tight">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {!isLogin && (
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="username" className="font-mono text-sm font-medium leading-normal text-gray-400 pl-4">Username</Label>
                      <Input id="username" name="username" value={formData.username} onChange={handleChange} required className="bg-gray-800/60 !border-2 !border-gray-700 text-white font-mono !rounded-full placeholder:text-gray-500 text-base font-normal py-3 px-4" placeholder="Enter your username"/>
                    </div>
                  )}
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email" className="font-mono text-sm font-medium leading-normal text-gray-400 pl-4">Email</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="bg-gray-800/60 !border-2 !border-gray-700 text-white font-mono !rounded-full placeholder:text-gray-500 text-base font-normal py-3 px-4" placeholder="example@email.com"/>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password" className="font-mono text-sm font-medium leading-normal text-gray-400 pl-4">Password</Label>
                    <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required className="bg-gray-800/60 !border-2 !border-gray-700 text-white font-mono !rounded-full placeholder:text-gray-500 text-base font-normal py-3 px-4" placeholder="••••••••"/>
                  </div>
                  <Button type="submit" size="lg" disabled={isLoading} className="w-full bg-white text-black font-mono hover:bg-gray-200 font-semibold transition-transform duration-300 hover:scale-105 !rounded-full disabled:opacity-50 text-lg leading-tight py-3 px-6">
                    {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
                  </Button>
                  <div className="text-center font-display pt-2 mt-6">
                    <p className="inline text-gray-400 text-sm font-normal">{isLogin ? 'Need an account? ' : 'Already have an account? '}</p>
                    <Button variant="link" type="button" className="inline p-1 h-auto font-semibold text-white hover:text-gray-300 text-sm" onClick={() => setIsLogin(!isLogin)}>
                      {isLogin ? 'Sign Up' : 'Sign In'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </GlowyCard>
        </div>
      </div>
    </GlowyCardWrapper>
  );
};

export default Auth;