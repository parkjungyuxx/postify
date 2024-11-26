import { useEffect, useState } from "react";
import img1 from "../../img/wisesaying1.png";
import img2 from "../../img/wisesaying2.png";
import img3 from "../../img/wisesaying3.png";
import img4 from "../../img/wisesaying4.png";
import img5 from "../../img/wisesaying5.png";
import img6 from "../../img/wisesaying6.png";
import img7 from "../../img/wisesaying7.png";
import img8 from "../../img/wisesaying8.png";
import img9 from "../../img/wisesaying9.png";
import img10 from "../../img/wisesaying10.png";
import "../../css/home.css";

const MainContent = () => {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

  const [randomImage, setRandomImage] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
  }, []);

  return (
    <div className="home-content-container">
      <img src={randomImage}></img>
    </div>
  );
};

export default MainContent;
