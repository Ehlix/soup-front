import { observer } from "mobx-react-lite";
import { Button } from "../ui/Button";
import { Context } from "@/main";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "@/api/auth";

export const NavMain = observer(() => {
  const { userStore } = useContext(Context);
  const { mutateAsync, data, error } = useMutation({
    mutationFn: () => signOut(),
  });

  const signOutHandler = async () => {
    const { data } = await mutateAsync();
    if (data) {
      userStore.setSignOut();
      window.location.reload();
    }
  };

  data && console.log("logout: ", data);
  error && console.log("error: ", error);

  return (
    <div>
      <nav>
        <Button onClick={signOutHandler}>Sign out</Button>
      </nav>
    </div>
  );
});
