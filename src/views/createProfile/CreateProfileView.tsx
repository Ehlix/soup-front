import { reatomComponent } from '@reatom/npm-react';
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
import { createProfile } from './model';
import { uploadImage } from '@/model';

export const CreateProfileView = reatomComponent(({ ctx }) => {
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

  const submit = async (): Promise<{
    profile: ProfileSchema;
    social: SocialSchema;
  } | null> => {
    let profile = null;
    let social = null;
    await formProfile.handleSubmit((payload) => {
      profile = payload;
    })();
    await formSocial.handleSubmit((payload) => {
      social = payload as SocialSchema;
    })();
    if (!profile || !social) return null;
    return { profile, social };
  };

  const saveHandler = async () => {
    const res = await submit();
    if (!res) return;
    const social = JSON.stringify(res.social);
    const data = { ...res.profile, social };
    createProfile(ctx, data);
  };

  const previewHandler = async () => {
    return !!(await submit());
  };

  return (
    <div className="flex h-full w-full grow items-center justify-center">
      <div className="flex w-3/5 flex-col gap-1 lg:w-4/5 sm:w-full">
        <div className="flex items-center text-3xl font-bold">
          Create Profile
        </div>
        <div className="flex justify-end gap-4">
          <Button
            disabled={
              ctx.spy(createProfile.statusesAtom).isPending ||
              ctx.spy(uploadImage.statusesAtom).isPending
            }
            onClick={saveHandler}
            className="w-32"
          >
            {ctx.spy(createProfile.statusesAtom).isPending
              ? 'Saving...'
              : 'Save'}
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
