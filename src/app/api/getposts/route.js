import DBConn from "../../../../lib/DBConn";
import { Blog } from "../../../../models/BlogModel";

export const GET = async (req) => {
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ msg: "Method Not Allowed." }), {
      status: 405,
    });
  }
  try {
    await DBConn();

    const blogData = await Blog.find();

    return new Response(JSON.stringify(blogData), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ msg: "Something Went Wrong." }), {
      status: 500,
    });
  }
};
