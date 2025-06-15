// 이 파일은 데이터에 대한 타입 정의를 포함합니다.
// 각 속성이 어떤 형태와 타입을 가져야 하는지 설명합니다.
// 학습을 쉽게 하기 위해 수동으로 타입을 정의했습니다.
// 실제로는 Prisma 같은 ORM을 사용하면 이러한 타입이 자동으로 생성됩니다.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // 타입스크립트에서는 이를 문자열 유니온 타입이라고 합니다.
  // 즉 "status" 속성은 'pending' 또는 'paid' 중 하나만 가질 수 있습니다.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// 데이터베이스에서는 금액을 숫자로 반환하지만
// 이후 formatCurrency 함수로 문자열 형식으로 변환합니다
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
