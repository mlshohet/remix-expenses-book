import { redirect } from "@remix-run/node";

export const loader = ({ params }) => {
  if (params["*"] === "exp") {
    return redirect("/expenses");
  }

  throw new Response("Not found", { status: 404 });
};
