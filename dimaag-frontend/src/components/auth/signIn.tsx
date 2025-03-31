'use client';
import EmailComponent from '@/components/auth/utils/emailComponent';
import { OtpComponent } from '@/components/auth/utils/otpComponent';
import PasswordComponent from '@/components/auth/utils/passwordComponent';
import { useAuth, useSignIn } from '@clerk/clerk-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Strategy = 'email' | 'password' | 'otp';
export default function SignIn() {
  const { isLoaded, signIn } = useSignIn();
  const [email, setEmail] = useState('');

  const [strategy, setStrategy] = useState<Strategy>('email');
  const [error, setError] = useState('');

  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  if (isSignedIn) {
    navigate('/dashboard');
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: email,
      });

      if (!result.supportedFirstFactors) {
        setError('Unable to proceed with authentication');
        return;
      } else {
        if (result.status === 'needs_first_factor') {
          const firstFactor = result.supportedFirstFactors.find(
            (factor) =>
              factor.strategy === 'password' ||
              factor.strategy === 'email_code',
          );
          console.log('inside need first factor', firstFactor);
          if (!firstFactor) {
            setError('Unable to proceed with authentication');
            return;
          }
          if (firstFactor.strategy === 'password') {
            setStrategy('password');
          } else if (firstFactor.strategy === 'email_code') {
            await signIn.prepareFirstFactor({
              strategy: 'email_code',
              emailAddressId: firstFactor.emailAddressId,
            });
            setStrategy('otp');
          }
        }
      }
      if (result.status === 'complete') {
        console.log('inside complete');
      }
    } catch (err) {
      //@ts-expect-error //@ts-expect-error err.errors is not defined
      setError(err.errors?.[0]?.message || 'Authentication failed');
    }
  };

  if (strategy === 'email') {
    return (
      <EmailComponent
        error={error}
        handleEmailSubmit={handleEmailSubmit}
        email={email}
        setEmail={setEmail}
      />
    );
  } else if (strategy === 'password') {
    return <PasswordComponent email={email} />;
  } else if (strategy === 'otp') {
    return <OtpComponent strategy={'email_code'} />;
  }
}
