import { create } from "apisauce";

const BASE_URL = "http://127.0.0.1:8000/";

const api = create({
  baseURL: BASE_URL,
});

export { api }
// export default { api }