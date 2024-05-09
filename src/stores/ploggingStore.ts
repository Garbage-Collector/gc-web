import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { appendFormData } from 'src/utils/setFormData';

export const usePloggingStore = defineStore('plogging', {
  state: () => ({
    title: '',
    content: '',
    location: '',
    images: [] as unknown as File[], //base64로 인코딩한 문자열?타입?
    startTime: '',
    endTime: '',
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
      //플로깅 작성 post API 호출
      try {
        const formData = new FormData();
        const ploggingData = {
          title: this.title,
          location: this.location,
          startTime: this.startTime,
          endTime: this.endTime,
          content: this.content,
        };
        appendFormData(formData, ploggingData); //유틸함수 appendFormData로 전송할  폼데이터 추가

        this.images.forEach((image) => {
          formData.append('image', image); //이미지 배열에 추가
        });
        console.log(`formData === [${formData}]`);
        const response = await api.post('/records', formData);
        console.log('서버 응답:', response);
        return response;
      } catch (error) {
        console.error('Error posting form data:', error);
      }
    },
  },
});
