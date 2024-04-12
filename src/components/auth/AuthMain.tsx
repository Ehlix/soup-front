import { useContext, useState } from "react";
import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { signIn, signUp } from "@/api/auth";
import { Context } from "@/main";
import { observer } from "mobx-react-lite";

const table = ["signIn", "signUp"] as const;

export const AuthMain = observer(() => {
  const [tab, setTab] = useState<(typeof table)[number]>("signIn");
  const { userStore } = useContext(Context);

  const { mutateAsync, data, error } = useMutation({
    mutationFn: (value: SignInParams) =>
      tab === "signIn" ? signIn(value) : signUp(value),
  });

  const signInHandler = async (value: SignInParams) => {
    const { data } = await mutateAsync(value);
    if (data) {
      userStore.setSignIn(data);
    }
  }

  if (data?.data) {
    userStore.setSignIn(data.data);
  }

  data && console.log("data: ", data);
  error && console.log("error: ", error);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-[60dvh] w-[60dvw] flex-col rounded-lg bg-card">
        <div className="relative flex h-16">
          <div
            className={cn(
              "absolute bottom-0 left-0 z-0 ml-[50%] h-1 w-[50%] bg-border transition-all",
              {
                "ml-0": tab === "signIn",
              },
            )}
          />
          {table.map((item) => (
            <button
              key={item}
              disabled={item === tab}
              onClick={() => setTab(item)}
              className={cn(
                "z-10 flex h-full w-full items-center justify-center",
                {
                  "bg-primary1": item === tab,
                },
              )}
            >
              {item === "signIn" ? "Sign in" : "Sign up"}
            </button>
          ))}
        </div>
        <div className="item flex h-full w-full flex-col  justify-center p-10">
          {tab === "signIn" ? (
            <SignIn onSubmit={(value) => signInHandler(value)} />
          ) : (
            <SignUp onSubmit={(value) => signInHandler(value)} />
          )}
        </div>
      </div>
      <div className="absolute bottom-0 right-0 p-2">
        {data?.data
          ? data.data?.user.email +
            (tab === "signIn" ? " is login" : " is register")
          : null}
      </div>
    </div>
  );
});
