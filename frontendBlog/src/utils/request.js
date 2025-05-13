export function request(path, method, data) {
  return fetch("/api" + path, {
    headers: {
      "content-type": "application/json",
    },
    method: method || "GET",
    body: data ? JSON.stringify(data) : undefined,
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  });
}
