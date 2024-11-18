import { defineStore } from 'pinia';
import { api, setHeaderToken } from 'src/boot/axios';
import { useProfileStore } from './profileStore';
import { formatResponseData } from 'src/utils/formatRecordData';

const profileStore = useProfileStore();

export const useSharedPloggingStore = defineStore('sharePlogging', {
  state: () => ({
    title: '',
    content: '',
    location: '',
    images: [] as File[],
    startTime: '',
    endTime: '',
    userId: '',
    ploggingRecord: [],
  }),

  actions: {
    setPloggingData(data) {
      this.title = data.title;
      this.location = data.location;
      this.startTime = data.startTime;
      this.endTime = data.endTime;
      this.userId = data.userId;
    },
    setPloggingContent(content) {
      this.content = content;
    },
    addPloggingImage(image: File) {
      this.images.push(image);
    },

    async getSharedPloggingRecord() {
      try {
        setHeaderToken(localStorage.getItem('accessToken'));
        const response = await api.get(`/records/diff/${profileStore.profile.id}`);
        this.ploggingRecord = formatResponseData(response.data);
      } catch (error) {
        console.error('플로깅 기록 데이터 호출 중 에러 발생:', error);
      }
    },
  },
});
