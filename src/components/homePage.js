import React, { usestate } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useState } from "react";
import Link
    from "next/link";
const Homepage = () => {
  const slides = [
    {
      url: "https://images.unsplash.com/photo-1574634534894-89d7576c8259?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1555529733-0e670560f7e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1557777586-f6682739fcf3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
    },
    {
      url: "https://plus.unsplash.com/premium_photo-1664872566146-1c3d25fdab77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1562347174-7370ad83dc47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1583222844068-539c9488524d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    },
  ];
  const [current, setCurrent] = useState(0);
  return (
    <div>
      <div className=" w-full m-auto relative group">
        <div
          style={{ backgroundImage: `url(${slides[current].url})` }}
          className="w-full h-screen bg-center bg-cover duration-500"
        >
          <div className="text-white text-[60px] absolute top-[50%] left-[40%] -translate-x-[40%] -translate-y-[50%] w-[90%]">
            <h1>Vintage unique curated peices </h1>
            <Link href="/home" className="text-[20px] hover:bg-black/10 hover:border-b-2 border-white w-[50px] p-2 rounded-lg">Get yours now</Link>
          </div>
        </div>
        <div
          onClick={() => {
            if (current === 0) {
              setCurrent(slides.length - 1);
            } else {
              setCurrent((prev) => prev - 1);
            }
          }}
          className="hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[-50%] text-white rounded-md cursor-pointer left-5 w-[50px] text-center p-2 bg-black/20 hover:bg-black/50"
        >
          <ArrowBackIosIcon />
        </div>
        <div
          onClick={() => {
            if (current === 6) {
              setCurrent(0);
            } else {
              setCurrent((prev) => prev + 1);
            }
          }}
          className="hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[-50%] right-5 text-white rounded-md cursor-pointer  w-[50px] text-center p-2 bg-black/20 hover:bg-black/50"
        >
          <ArrowForwardIosIcon />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
