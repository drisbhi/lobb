import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import renderHTML from "react-render-html";
import "./index.css";
import CloseIcon from "@mui/icons-material/Close";
import { fetchData } from "./redux/actions";

export default function App() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    // fetch data from API when the component is mounted
    dispatch(fetchData());
  }, [dispatch]);

  const handleLoad = () => {
    // refetch the data when the refresh button is clicked
    dispatch(fetchData());
  };

  // Show loading indicator while the data is being fetched
  if (loading) return <div>Loading...</div>;

  // Show error message if there is an error fetching data
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{data?.title}</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p style={{ width: "100 px" }}>{data?.subTitle}</p>
        <div>
          <CloseIcon onClick={() => setToggle(false)} />
        </div>
      </div>
      <div className="box" onClick={() => setToggle(true)}>
        <img
          src={data?.thumbNailImage}
          height={300}
          width={"100%"}
          alt="animies"
        />

        <div>
          {/* Show full content and main image when the box is clicked */}
          {toggle ? (
            <div>
              {renderHTML(data?.text)}
              <img
                src={data?.mainImage}
                height={300}
                width={"100%"}
                alt="animies"
              />
            </div>
          ) : null}
        </div>
      </div>
      <div
        style={{
          marginTop: "5%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <div class="img_h">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <img src={data?.logo} height={150} width={70} alt="animies" />

            <div>
              <h4>{data?.userName}</h4>
              <p>{data?.title}</p>
            </div>
          </div>
        </div>
        <button
          type="primary"
          style={{
            height: "30px",
            width: "150px",
            color: "grey",
            background: "white",
            borderRadius: "16px",
          }}
          onClick={handleLoad}
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
