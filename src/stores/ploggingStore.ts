import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { appendFormData } from 'src/utils/setFormData';
import { useProfileStore } from './profileStore';
import { formatResponseData } from 'src/utils/formatRecordData';

const profileStore = useProfileStore();

export const usePloggingStore = defineStore('plogging', {
  state: () => ({
    title: '',
    content: '',
    location: '',
    images: [] as File[],
    startTime: '',
    endTime: '',
    ploggingRecord: [],
  }),

  actions: {
    setPloggingData(data) {
      this.title = data.title;
      this.location = data.location;
      this.startTime = data.startTime;
      this.endTime = data.endTime;
    },
    setPloggingContent(content) {
      this.content = content;
    },
    addPloggingImage(image: File) {
      this.images.push(image);
    },

    async submitPlogging() {
      // 플로깅 작성 post API 호출
      try {
        const formData = new FormData();
        const ploggingData = {
          title: this.title,
          location: this.location,
          startTime: this.startTime,
          endTime: this.endTime,
          content: this.content,
        };
        appendFormData(formData, ploggingData);

        // 이미지를 FormData에 추가
        this.images.forEach((image) => {
          formData.append('images', image, image.name);
        });

        console.log('FormData:');
        formData.forEach((value, key) => {
          if (value instanceof Blob) {
            console.log(`${key}: [Blob] size=${value.size} type=${value.type}`);
          } else {
            console.log(`${key}: ${value}`);
          }
        });

        const response = await api.post(
          `/records/${profileStore.profile.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        console.log('서버 응답:', response);

        return response;
      } catch (error) {
        console.error('Error posting form data:', error);
      }
    },
    async getPloggingRecord() {
      try {
        const response = await api.get(`/records/${profileStore.profile.id}`);
        console.log(`전체 조회 응답 === [${JSON.stringify(response.data)}]`);
        this.ploggingRecord = formatResponseData(response.data);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      }
    },
  },
});
