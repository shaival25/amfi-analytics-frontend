import Cookies from "js-cookie";
import toast from "react-hot-toast";

const handleError = (error, router) => {
  console.error(error);
  if (error?.response?.status === 401) {
    Cookies.remove("authToken");
    router.push("/error-page/401");
  } else if (error?.response?.status === 400) {
    Cookies.remove("authToken");
    router.push("/auth/login");
  } else if (error?.response?.status === 500) {
    toast.error("Something went wrong. Please try again later");
  }
};

export default handleError;
