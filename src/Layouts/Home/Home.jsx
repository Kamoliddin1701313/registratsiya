import { useEffect, useRef, useState } from "react";
import style from "./home.module.scss";
import axios from "axios";
const Home = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const titleRef = useRef();

  const getUsers = async () => {
    const respons = await axios.get("https://dummyjson.com/products");
    setData(respons.data.products);
    setOriginalData(respons.data.products);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const SeandMessage = () => {
    const searchValue = titleRef.current.value.trim().toLowerCase();

    if (searchValue === "") {
      setData(originalData);
    } else {
      const result = originalData.filter((qiymat) =>
        qiymat.title.toLowerCase().includes(searchValue)
      );
      setData(result);
    }
  };

  return (
    <div>
      <input type="text" placeholder="Search ..." ref={titleRef} />
      <button onClick={SeandMessage}>Yuborish</button>
      {data?.map((value, index) => (
        <div key={index}>
          <h5 style={{ margin: "10px" }}>{value?.title}</h5>
        </div>
      ))}
    </div>
  );
};

export default Home;
