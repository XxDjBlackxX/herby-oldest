import AdminManageUsersController from "./users";
import AdminManageApplicationsController from "./applications";
import AdminManageCurrenciesController from "./currencies";
import AdminManageTransactionsController from "./transactions";

export default class AdminManageController {
  currencies = new AdminManageCurrenciesController();
  users = new AdminManageUsersController();
  applications = new AdminManageApplicationsController();
  transactions = new AdminManageTransactionsController();
}
