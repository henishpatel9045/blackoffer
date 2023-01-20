import { create } from "apisauce";

const BASE_URL = "http://blackoffer.pythonanywhere.com/";

const api = create({
  baseURL: BASE_URL,
});

export { api }
// export default { api }