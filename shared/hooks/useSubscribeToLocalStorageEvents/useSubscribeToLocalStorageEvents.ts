import { useSubscribeToLanguageStorageEvents } from "./useSubscribeToLanguageStorageEvents";
import { useSubscribeToSignInStorageEvent } from "./useSubscribeToSignInStorageEvent";
import { useSubscribeToSignOutStorageEvent } from "./useSubscribeToSignOutStorageEvent";

export const useSubscribeToLocalStorageEvents = () => {
  useSubscribeToSignInStorageEvent();
  useSubscribeToSignOutStorageEvent();
  useSubscribeToLanguageStorageEvents();
};
