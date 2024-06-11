import { defineStore } from 'pinia';
import { UserProfile } from 'src/types/userProfile';

export const useProfileStore = defineStore('profileStore', {
  state: () => ({
    profile: {
      id: 0,
      email: '',
      password: '',
      nickname: '',
    },
  }),
  actions: {
    setProfile(profile: UserProfile) {
      this.profile = profile;
    },
  },
});
