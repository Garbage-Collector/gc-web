export const formatResponseData = (responseData) => {
  const baseUrl = import.meta.env.VITE_BASE_URL_IMAGE;
  console.log(`responseData === [${JSON.stringify(responseData)}]`);

  return responseData.map((record) => ({
    id: record.id,
    title: record.title,
    startDate: record.startTime,
    photo: record.image[0] ? `${baseUrl}${record.image[0].imageUrl}` : '', // 이미지가 있을 경우 URL 앞에 baseUrl 추가
    userId: record.userId
  }));
};
