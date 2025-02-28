import api from ".";

const mockData = {
  code: 0,
  message: "success",
  value: []
};

export const getMenu = async () => {
  try {
    // Simulate fetching data
    if (localStorage.getItem("mockUsername")) {
      if (mockData.code === 0) {
        return mockData.value;
      } else {
        console.log(mockData);
      }
    } else {
      const url = `/api/v1/menu/get-menu-tree-by-current-user`;
      const response = await api.withAuth.get(url);
      /*if (response.data.code === 0) {
        return response.data.value;
      } else {
        console.log(response.data);
      }*/
      if (mockData.code === 0) {
        return mockData.value;
      } else {
        console.log(mockData);
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export const getMenuCodeCurrentUserCanApprove = async () => {
  try {
    const url = `/api/v1/menu/get-menu-current-user-can-approve`;
    const response = await api.withAuth.get(url);
    console.log("menu1", response.data);

    if (response.data.code === 0) {
      return response.data.value;
    } else {
      console.log(response.data);
    }
  } catch (e) {
    console.log(e);
  }
};

// Bank
export const getMenuMaster = async () => {
  try {
    const baseURL_API = import.meta.env.VITE_API_BASE_URL;
    const url = `${baseURL_API}/api/v1/menu`;

    const response = await api.withAuth.get(url);
    console.log("sidebar", response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const menuService = {
  getMenu
};

export default menuService;
