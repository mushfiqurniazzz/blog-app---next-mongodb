import DBConn from "../../../../../lib/DBConn";
import { Blog } from "../../../../../models/BlogModel";

export const GET = async (req, { params }) => {
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ msg: "Method Not Allowed." }), {
      status: 405,
    });
  }

  const { id } = params;

  if (!id || id === "") {
    return new Response(JSON.stringify({ msg: "Provide The Post Id." }), {
      status: 400,
    });
  }
  try {
    await DBConn();

    const retrievePost = await Blog.findById(id);

    if (!retrievePost) {
      return new Response(
        JSON.stringify({ msg: "No Post Found With This Id." }),
        {
          status: 404,
        }
      );
    }

    return new Response(JSON.stringify(retrievePost), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ msg: "Something Went Wrong." }), {
      status: 500,
    });
  }
};
