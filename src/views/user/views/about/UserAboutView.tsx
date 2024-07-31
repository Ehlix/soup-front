import { reatomComponent } from '@reatom/npm-react';
import { userProfile } from '../../model';

export const UserAboutView = reatomComponent(({ ctx }) => {
  const profile = ctx.spy(userProfile.dataAtom)?.data;
  return (
    <div className="flex w-full flex-col items-start gap-4 p-2">
      <div>
        <h4>About me:</h4>
        <p>{profile?.description}</p>
      </div>
      <div>
        <h4>Location:</h4>
        <p className="capitalize">
          {profile?.country}, {profile?.city}
        </p>
      </div>
      <div>
        <h4>Social links:</h4>
        {profile?.social?.publicEmail && (
          <p>Email: {profile?.social?.publicEmail}</p>
        )}
        {profile?.social?.facebook && (
          <p>Github: {profile?.social?.facebook}</p>
        )}
        {profile?.social?.twitter && <p>Twitter: {profile?.social?.twitter}</p>}
        {profile?.social?.instagram && (
          <p>Instagram: {profile?.social?.instagram}</p>
        )}
        {profile?.social?.linkedin && (
          <p>Linkedin: {profile?.social?.linkedin}</p>
        )}
      </div>
    </div>
  );
}, 'UserAboutView');
