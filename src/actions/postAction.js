import * as PostsApi from "../api/PostRequests";

export const getTimelinePosts = (id) => async (dispatch) => {
 
  dispatch({ type: "RETREIVING_START" });
  
  try {
    console.log('start');
    const { data } = await PostsApi.getTimelinePosts(id);
    console.log("hey"+data);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};