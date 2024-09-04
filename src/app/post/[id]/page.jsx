"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

const page = () => {
  const param = useParams();
  console.log(param);
  const [blogData, setBlogData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/post/${param.id}`);
        const data = await res.json();
        setBlogData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
        return toast.error("Something went wrong, try again later.");
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="body-container p-4">
        {blogData.length === 0 ? (
          <div>
            <h1>No post found, return to home.</h1>
          </div>
        ) : (
          <div className="blog-container">
            <>
              <h1 className="py-4 font-semibold text-2xl">{blogData.title}</h1>
              <p className="py-1 text-sm">
                <strong className="font-semibold">Blog Id: </strong>
                {blogData._id}
              </p>
              <p className="py-1 text-sm">
                <strong className="font-semibold">Uploaded on: </strong>
                {blogData.date}
              </p>
              <p className="py-1 text-sm">
                <strong className="font-semibold">Author id: </strong>
                {blogData.author}
              </p>
              <Image
                src="/assets/coverphoto.png"
                alt=""
                width={1000}
                height={1000}
              />
              <p className="py-4 text-lg">{blogData.body}</p>
            </>
          </div>
        )}
      </div>
    </>
  );
};

export default page;
