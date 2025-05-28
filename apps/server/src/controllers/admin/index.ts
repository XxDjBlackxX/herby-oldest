import AdminDataController from "./data";
import AdminManageController from "./manage";

export default class Controller {
  data = new AdminDataController();
  manage = new AdminManageController();
}
