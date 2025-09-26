import React from 'react';
import { Button } from '../ui/Button';
// Placeholder for social icons
const GoogleIcon = () => <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.19,4.73C14.03,4.73 15.6,5.33 16.8,6.31L19.14,4.2C17.2,2.56 14.83,1.69 12.19,1.69C6.94,1.69 3,6.33 3,12C3,17.67 6.94,22.31 12.19,22.31C17.44,22.31 21.5,18.33 21.5,12.33C21.5,11.76 21.44,11.43 21.35,11.1Z"></path></svg>;
const FacebookIcon = () => <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.32 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"></path></svg>;


export const SocialLogins: React.FC = () => {
    // TODO: Implement social login logic with Supabase
    const handleSocialLogin = (provider: 'google' | 'facebook') => {
        console.log(`Login with ${provider} clicked. Implement Supabase social auth.`);
        // await supabase.auth.signInWithOAuth({ provider });
    };

    return (
        <>
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-surface px-2 text-text-secondary">Or continue with</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => handleSocialLogin('google')}>
                    <GoogleIcon />
                    Google
                </Button>
                <Button variant="outline" onClick={() => handleSocialLogin('facebook')}>
                    <FacebookIcon />
                    Facebook
                </Button>
            </div>
        </>
    );
};
