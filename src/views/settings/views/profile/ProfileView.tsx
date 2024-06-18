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
// import { createProfile } from './model';
import { uploadImage, sessionDataAtom } from '@/model';
import { updateProfile } from './model';

export const ProfileView = reatomComponent(({ ctx }) => {
  const sessionProfile = ctx.get(sessionDataAtom)?.userProfile;
  const formProfile = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      avatar: '',
      name: sessionProfile?.name || '',
      city: sessionProfile?.city || '',
      country: sessionProfile?.country || '',
      description: sessionProfile?.description || '',
      headline: sessionProfile?.headline || '',
    },
    mode: 'onSubmit',
  });

  const formSocial = useForm<SocialSchema>({
    resolver: zodResolver(socialSchema),
    defaultValues: {
      publicEmail: sessionProfile?.social?.publicEmail || '',
      website: '',
      twitter: sessionProfile?.social?.twitter || '',
      facebook: sessionProfile?.social?.facebook || '',
      instagram: sessionProfile?.social?.instagram || '',
      linkedin: sessionProfile?.social?.linkedin || '',
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
    const data = {
      ...res.profile,
      social,
      avatar: res.profile.avatar === 'empty' ? '' : res.profile.avatar,
    };
    !res.profile.avatar && delete data.avatar;
    updateProfile(ctx, data);
    console.log(res.profile, res.social);
  };

  return (
    <div className="flex h-full w-full grow items-center justify-center">
      <div className="flex w-full flex-col gap-1">
        {/* <div className="flex items-center text-3xl font-bold">Profile</div> */}
        <div className="flex justify-end gap-4">
          <Button
            disabled={ctx.spy(uploadImage.statusesAtom).isPending}
            onClick={saveHandler}
            className="w-32"
          >
            {ctx.spy(updateProfile.statusesAtom).isPending
              ? 'Saving...'
              : 'Save'}
          </Button>
        </div>
        <Profile form={formProfile} />
        <Social form={formSocial} />
      </div>
    </div>
  );
}, 'ProfileView');
