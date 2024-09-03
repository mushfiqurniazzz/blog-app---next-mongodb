import DBConn from "../../../../lib/DBConn";
import { Blog } from "../../../../models/BlogModel";
import { User } from "../../../../models/UserModel";

export const POST = async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ msg: "Method Not Allowed." }), {
      status: 405,
    });
  }

  const { email } = await req.json();

  if (!email || email === "") {
    return new Response(JSON.stringify({ msg: "User Is Not Authenticated" }), {
      status: 401,
    });
  }
  try {
    await DBConn();

    const retrieveUserId = await User.findOne({ email });

    const retrievePosts = await Blog.find({ author: retrieveUserId._id });

    return new Response(JSON.stringify(retrievePosts), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ msg: "Something Went Wrong." }), {
      status: 500,
    });
  }
};
