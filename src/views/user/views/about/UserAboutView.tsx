import { reatomComponent } from '@reatom/npm-react';
import * as model from '../../model';

export const UserAboutView = reatomComponent(({ ctx }) => {
  const userData = ctx.spy(model.userDataAtom);
  if (!userData) return null;
  const userProfile = ctx.spy(userData.userProfile.dataAtom)?.data;
  return (
    <div className="flex w-full flex-col items-start gap-4 p-2">
      <div>
        <h4>About me:</h4>
        <p>{userProfile?.description}</p>
      </div>
      <div>
        <h4>Location:</h4>
        <p>
          {userProfile?.country}, {userProfile?.city}
        </p>
      </div>
      <div>
        <h4>Social links:</h4>
        {userProfile?.social?.publicEmail && (
          <p>Email: {userProfile?.social?.publicEmail}</p>
        )}
        {userProfile?.social?.facebook && (
          <p>Github: {userProfile?.social?.facebook}</p>
        )}
        {userProfile?.social?.twitter && (
          <p>Twitter: {userProfile?.social?.twitter}</p>
        )}
        {userProfile?.social?.instagram && (
          <p>Instagram: {userProfile?.social?.instagram}</p>
        )}
        {userProfile?.social?.linkedin && (
          <p>Linkedin: {userProfile?.social?.linkedin}</p>
        )}
      </div>
    </div>
  );
}, 'UserAboutView');
