import { request } from "../utils/request";
import { removeComment } from "./remove-comment";

export const removeCommentAsync = (postId, id) => (dispatch) => {
  request(`/posts/${postId}/comments/${id}`, "DELETE").then((postData) => {
    dispatch(removeComment(id));
  });
};
