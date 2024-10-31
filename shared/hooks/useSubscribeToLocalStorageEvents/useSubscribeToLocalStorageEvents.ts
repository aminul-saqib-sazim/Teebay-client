import { useSubscribeToSignInStorageEvent } from "./useSubscribeToSignInStorageEvent";
import { useSubscribeToSignOutStorageEvent } from "./useSubscribeToSignOutStorageEvent";

export const useSubscribeToLocalStorageEvents = () => {
  useSubscribeToSignInStorageEvent();
  useSubscribeToSignOutStorageEvent();
};
