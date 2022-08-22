import requests from "./ajax"
// 获取图片上传
export const reqpostImgupload = () =>requests.post(`/fileUpload`);

