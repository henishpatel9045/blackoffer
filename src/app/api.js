import { create } from "apisauce";

const BASE_URL = "https://blackoffer.pythonanywhere.com/";

const api = create({
  baseURL: BASE_URL,
});

export { api }
// export default { api }