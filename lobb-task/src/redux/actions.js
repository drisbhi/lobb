// src/redux/actions.js

export const fetchData = () => async (dispatch) => {
    dispatch({ type: "FETCH_DATA_REQUEST" });
    try {
      const token =
        "eyJhbGciOiJIUzI1NiJ9.YmFqYWpzYWhpYjNAZ21haWwuY29t.u43Nv9_C8TynUEmj6Q1eC08YryZrSyLlLrz0mQq4Gco";
      const response = await fetch(
        "https://tzab40im77.execute-api.ap-south-1.amazonaws.com/prod/getContent",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const jsonData = await response.json();
      dispatch({ type: "FETCH_DATA_SUCCESS", payload: jsonData.content });
    } catch (error) {
      dispatch({ type: "FETCH_DATA_FAILURE", payload: error.message });
    }
  };
  