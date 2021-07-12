import axios from "axios";
const pagePath = `http://localhost:3000/devices`;

export const getDevicesList = async () => {
  const { data } = await axios.get(pagePath);
  return data;
};

export const updateDevice = async (path, updateDev) => {
  const { data } = await axios.put(path, updateDev);
  return data;
};

export const deleteDevice = async (path) => {
  await axios.delete(path);
};

export const getDevicesListLength = async () => {
  const devicesList = await getDevicesList();
  return devicesList.length;
};
