export const apiUrl = (baseRoute, method, id) => {
  if (method === "return") return `${baseRoute}/return/${id}`;
  if (id) return `${baseRoute}/${id}`;
  return baseRoute;
};

export const methods = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete"
};

export const routes = {
  BORROWAL: "/api/borrowals",
  BOOK: "/api/books",
  USER: "/api/users"
};
