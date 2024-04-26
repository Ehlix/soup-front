import { SignIn } from '@/components/auth/SignIn';
import { SignUp } from '@/components/auth/SignUp';
import { cn } from '@/lib/utils';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

const table = ['signIn', 'signUp'] as const;

export const Route = createFileRoute('/auth')({
  component: Auth,
});

function Auth() {
  const [tab, setTab] = useState<(typeof table)[number]>('signIn');
  return (
    <div className="flex h-full w-full grow items-center justify-center">
      <div className="jus flex h-[30rem] w-[60dvw] max-w-2xl flex-col rounded-lg bg-card/35 sm:w-[100dvw]">
        <div className="relative flex h-16">
          <div
            className={cn(
              'absolute bottom-0 left-0 z-0 ml-[50%] h-1 w-[50%] bg-border transition-all',
              {
                'ml-0': tab === 'signIn',
              },
            )}
          />
          {table.map((item) => (
            <button
              key={item}
              disabled={item === tab}
              onClick={() => setTab(item)}
              className={cn(
                'z-10 flex h-full w-full items-center justify-center disabled:cursor-pointer',
                {
                  'bg-primary1': item === tab,
                },
              )}
            >
              {item === 'signIn' ? 'Sign in' : 'Sign up'}
            </button>
          ))}
        </div>
        <div className="item items flex h-full w-full flex-col  justify-center p-10">
          {tab === 'signIn' ? (
            <SignIn onSubmit={() => {}} />
          ) : (
            <SignUp onSubmit={() => {}} />
          )}
        </div>
      </div>
    </div>
  );
}
