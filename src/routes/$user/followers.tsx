import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$user/followers')({
  component: Followers,
});

function Followers() {
  return (
    <div className="grid grid-cols-6 gap-2 xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
      {/* {users.map((user) => (
        <UserCard key={user.id} userWithProfile={user} />
      ))} */}
    </div>
  );
}
