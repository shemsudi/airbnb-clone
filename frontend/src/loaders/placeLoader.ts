import api from "../configs/api.ts";
const hostloader = async () => {
  const response = await api.get("/place/getHosts", {
    params: { structure: "Boat" },
  });
  const homes = response.data;
  return { homes } || null;
};

const hostloader2 = async () => {
  setTimeout(() => {
    console.log("Loading...");
  }, 3000);
  const response = await api.get("/place/getHosts", {
    params: { structure: "Castle" },
  });
  const homes = response.data;
  return { homes } || null;
};

export { hostloader2 };
export default hostloader;
