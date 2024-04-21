/**
 * 객체의 키-값 쌍을 FormData 객체에 추가
 * @param formData FormData 객체
 * @param data 객체의 키-값 쌍을 포함하는 데이터
 */
export function appendFormData(
  formData: FormData,
  data: Record<string, string>,
): FormData {
  Object.entries(data).forEach(([key, value]) => {
    if (value != null) {
      // null 또는 undefined 값은 제외
      formData.append(key, value);
    }
  });
  return formData;
}
