import { Invoices } from "../pages/invoices";
import { CreateOrUpdateInvoice } from "../pages/createOrUpdateInvoice";
import ViewInvoice from "../pages/viewInvoice";

const AppRoutes = [
  {
    index: true,
    path: '/',
    element: <Invoices />,
    name: "Invoices",
  },
  {
    path: '/create',
    element: <CreateOrUpdateInvoice />,
    name: "Create Invoice",
  },
  {
    path: '/create/:id',
    element: <CreateOrUpdateInvoice />,
    name: "Modify Invoice",
    hide: true,
  },
  {
    path: '/invoice/:id',
    element: <ViewInvoice />,
    name: "View Invoice",
    hide: true,
  }
];

export default AppRoutes;
