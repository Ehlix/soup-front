import { lsRemoveToken, lsSetToken } from "@/api";
import { makeAutoObservable, runInAction, toJS } from "mobx";

export default class UserStore {
  private $user: User | null = null;
  private $isAuth: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setSignIn(data: AuthResponse) {
    if (!data.user) return;
    runInAction(() => {
      this.$user = { ...data.user };
      this.$isAuth = true;
      lsSetToken(data.accessToken);
    });
  }

  setSignOut() {
    runInAction(() => {
      this.$user = null;
      this.$isAuth = false;
      lsRemoveToken();
    });
  }

  get user() {
    return toJS(this.$user);
  }

  get isAuth() {
    return this.$isAuth;
  }
}
