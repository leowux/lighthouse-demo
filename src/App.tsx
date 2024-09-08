import * as React from "react";
import image1 from "@/assets/images/image1.jpg";
import image2 from "@/assets/images/image2.jpg";
import image3 from "@/assets/images/image3.jpg";
import image4 from "@/assets/images/image4.jpg";
import image5 from "@/assets/images/image5.jpg";
import image6 from "@/assets/images/image6.jpg";
import image7 from "@/assets/images/image7.jpg";
import image8 from "@/assets/images/image8.jpg";
import Button from "antd/es/button";
import * as dayjs from "dayjs";
import "./App.less";
const expensiveComputation = () => {
  return 3010936384;
};
const App: React.FC = () => {
  const time = dayjs().format("MMMM Do YYYY, h:mm:ss a");
  const num = expensiveComputation();
  return (
    <div className="app">
      <Button type="primary" icon="search">Button</Button>
      <div>num: {num}</div>
      <div>time: {time}</div>
      <div>
        <p>Hello Squirrel!</p>
        <img width={300} height={200} src={image1} alt="" />
      </div>
      <div>
        <p>Hello Squirrel!</p>
        <img width={300} height={200} src={image2} alt="" />
      </div>
      <div>
        <p>Hello Squirrel!</p>
        <img width={300} height={200} src={image3} alt="" />
      </div>
      <div>
        <p>Hello Squirrel!</p>
        <img width={300} height={200} src={image4} alt="" />
      </div>
      <div>
        <p>Hello Squirrel!</p>
        <img width={300} height={200} src={image5} alt="" />
      </div>
      <div>
        <p>Hello Squirrel!</p>
        <img width={300} height={200} src={image6} alt="" />
      </div>
      <div>
        <p>Hello Squirrel!</p>
        <img width={300} height={200} src={image7} alt="" />
      </div>
      <div>
        <p>Hello Squirrel!</p>
        <img width={300} height={200} src={image8} alt="" />
      </div>
    </div>
  );
};

export default App;
