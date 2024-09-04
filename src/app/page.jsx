"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Home = () => {
  const [blogData, setBlogData] = useState([]);

  const bodyCharLimit = 115;
  const titleCharLimit = 60;

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + ".....";
    }
    return text;
  };
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await fetch("/api/getposts");
        const data = await res.json();
        setBlogData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
        return toast.error("Something went wrong, try again later.");
      }
    };
    fetchBlogData();
  }, []);
  return (
    <>
      {blogData.length === 0 ? (
        <div>
          <h1 className="text-center text-2xl font-semibold py-4">
            No blog posts found in database, click here to create a post.
          </h1>
          <button type="button">Create Post</button>
        </div>
      ) : (
        <>
          <h1 className="text-center text-2xl font-semibold py-4">
            Latest Blogs
          </h1>
          <div className="grid grid-cols-2 place-items-center gap-2 p-2">
            {blogData.map((blog) => (
              <div
                className="grid grid-cols-1 place-items-center border rounded-md border-green-300 bg-slate-100 w-80 h-full transition-transform transform hover:scale-105 hover:shadow-xl"
                key={blog._id}
              >
                <Link
                  type="button"
                  className="p-2 hover:cursor-pointer"
                  href={`/post/${blog._id}`}
                >
                  <Image
                    src="/assets/coverphoto.png"
                    width={300}
                    height={200}
                  />
                </Link>
                <h1 className="text-xl font-semibold p-2">
                  {truncateText(blog.title, titleCharLimit)}
                </h1>
                <p className="p-1 text-sm">{blog.date}</p>
                <p className="p-1 text-sm">
                  <strong className="font-semibold">Author Id: </strong>
                  {blog.author}
                </p>
                <p className="p-2 text-lg">
                  {truncateText(blog.body, bodyCharLimit)}
                </p>
                <button
                  type="button"
                  className="p-2 m-2 border rounded-md border-green-300 bg-blue-100 hover:bg-blue-200"
                >
                  <Link type="button" href={`/post/${blog._id}`}>
                    Read More
                  </Link>
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
