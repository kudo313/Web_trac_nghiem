
import { isEmpty } from 'lodash'

const checkLogin = () => {
  if (!isEmpty(localStorage.getItem("accessToken"))) return true;
  return false
};

export default checkLogin



