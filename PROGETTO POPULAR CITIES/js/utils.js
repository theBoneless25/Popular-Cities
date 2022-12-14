const qs = (el) => document.querySelector(el);

const ce = (el) => document.createElement(el);

const GET = async (BASE_URL) => {
  const res = await fetch(`${BASE_URL}?limit=40&offset=0`);
  return await res.json();
};

const DELETE = async (URL, id) => {
  return await fetch(`${URL}/${id}`, {
    method: "DELETE",
  });
};

export { ce, qs, GET, DELETE };
