import { AuthMain } from "@/components/auth/AuthMain";
import { Context } from "./main";
import { useContext } from "react";
import { refreshToken } from "./api/auth";
import { NavMain } from "./components/navigation/NavMain";
import { observer } from "mobx-react-lite";
import { useQuery } from "@tanstack/react-query";

const useIsAuth = (infinite: boolean = false) => {
  return useQuery({
    queryKey: ["refreshToken", infinite],
    queryFn: () => refreshToken(),
    retryDelay: 5000,
    retry: infinite,
  });
};

export const App = observer(() => {
  const { userStore } = useContext(Context);
  const { data, isLoading } = useIsAuth(userStore.isAuth);
  data?.data && userStore.setSignIn(data.data);
  // const [isLoading, setLoading] = useState(false);
  // useEffect(() => {
  //   setLoading(true);
  //   refreshToken()
  //     .then((data) => {
  //       if (data?.data) {
  //         userStore.setSignIn(data.data);
  //         console.log(data.data);
  //       }
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     })
  //     .finally(() => setLoading(false));
  // }, [userStore]);
  // console.log(userStore.user)
  return (
    <>
      {isLoading ? (
        <div className="flex w-full grow items-center justify-center gap-1 p-1">
          Loading
        </div>
      ) : (
        <div className="flex w-full grow gap-1 bg-background p-1">
          {userStore.isAuth ? <NavMain /> : <AuthMain />}
        </div>
      )}
    </>
  );
});
