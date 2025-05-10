import { request } from "../utils/request";
import { setPostData } from "./set-post-data";

export const loadPostAsync = (postId) => (dispatch) => {
  return request(`/posts/${postId}`)
    .then((postData) => {
      if (postData.data) {
        dispatch(setPostData(postData.data));
      }
      return postData;
    })
    .catch((error) => {
      console.error("Ошибка при загрузке поста:", error);
      return { error: error.message || "Неизвестная ошибка", data: null };
    });
};
