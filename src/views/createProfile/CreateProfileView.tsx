import { reatomComponent } from '@reatom/npm-react';
('use client');
import { Profile } from './components/Profile';
import { Button } from '@/components/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  ProfileSchema,
  SocialSchema,
  profileSchema,
  socialSchema,
} from './validation';
import { Social } from './components/Social';
import { Preview } from './components/Preview';

export const CreateProfileView = reatomComponent(() => {
  const formProfile = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      avatar: '',
      name: '',
      city: '',
      country: '',
      description: '',
      headline: '',
    },
    mode: 'onSubmit',
  });

  const formSocial = useForm<SocialSchema>({
    resolver: zodResolver(socialSchema),
    defaultValues: {
      publicEmail: '',
      website: '',
      twitter: '',
      facebook: '',
      instagram: '',
      linkedin: '',
    },
    mode: 'onSubmit',
  });

  const submit = async () => {
    let profile;
    let social;
    await formProfile.handleSubmit((payload) => {
      profile = payload;
    })();
    await formSocial.handleSubmit((payload) => {
      social = payload;
    })();
    if (!profile || !social) return null;
    return { profile, social };
  };

  const saveHandler = async () => {
    const res = await submit();
    if (!res) return;
    console.log(res.profile, res.social);
  };

  const previewHandler = async () => {
    return !!(await submit());
  };

  return (
    <div className="flex h-full w-full grow items-center justify-center ">
      <div className="flex w-3/5 flex-col gap-1 lg:w-4/5 sm:w-full">
        <div className="flex justify-center gap-4">
          <Button onClick={saveHandler} className="w-32">
            {'Save'}
          </Button>
          <Preview
            onClick={previewHandler}
            profile={formProfile.getValues()}
            social={formSocial.getValues()}
          />
        </div>
        <Profile form={formProfile} />
        <Social form={formSocial} />
      </div>
    </div>
  );
}, 'CreateProfileView');
