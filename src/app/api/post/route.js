import DBConn from "../../../../lib/DBConn";
import { Blog } from "../../../../models/BlogModel";
import { User } from "../../../../models/UserModel";

export const POST = async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ msg: "Method Not Allowed." }), {
      status: 405,
    });
  }

  const { title, body, email } = await req.json();

  if (!email || email === "") {
    return new Response(JSON.stringify({ msg: "User Is Not Authenticated." }), {
      status: 401,
    });
  }

  if (!title || title === "" || !body || body === "") {
    return new Response(JSON.stringify({ msg: "All Fields Are Required." }), {
      status: 499,
    });
  }

  try {
    await DBConn();

    const retrieveUser = await User.findOne({ email });
    const userId = retrieveUser._id;

    await Blog.create({
      title: title,
      body: body,
      author: userId,
    });

    return new Response(JSON.stringify({ msg: "New Blog Added." }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ msg: "Something Went Wrong." }), {
      status: 500,
    });
  }
};
