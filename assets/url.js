const Login = 'http://erp.middlemen.asia/api/login';
const Getsupplier = 'http://erp.middlemen.asia/api/viewsuppliers/';
const GetSuppliersList = 'http://erp.middlemen.asia/api/productsview/';
const GetsupplierDetails = 'http://erp.middlemen.asia/api/suppliersget/';
const GetCompanyDetails = 'http://erp.middlemen.asia/api/supplierindex/';
const SendOrder = 'http://erp.middlemen.asia/api/sendorder/';
const OrderApproval = 'http://erp.middlemen.asia/api/sendapprovals/'; 
const Dashboard = 'http://erp.middlemen.asia/api/vieworders/';
const SupplierById = 'http://erp.middlemen.asia/api/viewsuppliersbyid/';
const UploadImage = 'http://erp.middlemen.asia/Newapp/UploadImage.php';
//Outlet
const GetOutletDetails = 'http://erp.middlemen.asia/Newapp/getOutlet.php';
//Dashboard
//http://erp.middlemen.asia/Newapp/ReceiveOrder.php
//http://erp.middlemen.asia/api/line/receive/
const ViewProduct = 'http://erp.middlemen.asia/api/viewproductbyid/';
const ReceiveOrder = 'http://erp.middlemen.asia/Newapp/ReceiveOrder.php';
const ReceiveOrder1 = 'http://erp.middlemen.biz/api/editreceiveLineOrder/';
const GetInvoice = 'http://erp.middlemen.asia/Newapp/getInvoice.php';
const CancelOrder = 'http://erp.middlemen.asia/api/cancel/';
const ResendOrder = 'http://erp.middlemen.asia/api/resend/';
const PrintOrder = 'http://erp.middlemen.asia/print/';
const ViewOrder = 'http://erp.middlemen.asia/api/editreceiveorder/';
//Report
const SunReport = 'http://erp.middlemen.asia/api/line/received/apilist/';
const OrderedProducts = 'https://erp.middlemen.asia/api/viewOrderedProducts/';
const PendingProducts = 'http://erp.middlemen.asia/api/viewAllProducts/';
const AddNewOrder = 'http://erp.middlemen.asia/Newapp/AddNewOrder.php';
//Images
const Logo = {uri:'http://erp.middlemen.asia/img/logo.png'};

export default {
  Login,
  Logo,
  Getsupplier,
  GetSuppliersList,
  GetsupplierDetails,
  GetCompanyDetails,
  SendOrder,
  OrderApproval,
  Dashboard,
  SupplierById,
  ReceiveOrder,
  CancelOrder,
  ResendOrder,
  PrintOrder,
  GetOutletDetails,
  ViewOrder,
  ReceiveOrder1,
  UploadImage,
  SunReport,
  OrderedProducts,
  PendingProducts,
  GetInvoice,
  ViewProduct,
  AddNewOrder
}