//"use client";
import { NextPage } from "next";
import Map from "../app/Components/Map";

const Home: NextPage = () => {
  const positionInfos = [{ address: "University of Moratuwa" }];

  return (
    <div>
      <h1>Map Example</h1>
      <Map positionInfos={positionInfos} />
    </div>
  );
};

export default Home;
