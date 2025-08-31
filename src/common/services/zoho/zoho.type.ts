export interface Taxes {
  tax_id: string;
  tax_name: string;
  tax_percentage: number;
  tax_type: string;
  tax_specific_type: string;
  is_default_tax: boolean;
  is_editable: boolean;
  tax_specification: string;
  diff_rate_reason: string;
}

export interface PageContext {
  page: number;
  per_page: number;
  has_more_page: boolean;
  report_name: string;
  applied_filter: string;
  sort_column: string;
  sort_order: string;
  search_criteria?:any[]
}

export interface Tags {
  tag_id: string;
  tag_name: string;
  associated_with: string;
  is_active: boolean;
  is_tag_mandatory?: boolean;
  tag_options: string | TagOptions[];
  status: string;
}

export interface ReportingTag {
  tag_id: string;
  tag_name: string;
  associated_with: string;
  is_active: boolean;
  status: string;
  tag_options: string | TagOptions[];
}

export interface TagOptions {
  tag_option_id: string;
  tag_option_name: string;
  is_active: boolean;
  status: string;
}

export interface ZohoResponse {
  code?: number;
  message?: string;
  reporting_tags?: Tags[];
  reporting_tag?: ReportingTag;
  page_context?: PageContext;
  chartofaccounts?: ChatOfAccounts[];
  currencies?: Currencies[];
  taxes?: Taxes[];
  warehouses?: Warehouses[];
  transporters?: Transporters[];
}

export interface Warehouses {
  warehouse_id: string;
  warehouse_name: string;
  attention: string;
  address: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  state_code: string;
  country: string;
  zip: string;
  phone: string;
  email: string;
  is_primary: boolean;
  status: string;
  is_fba_warehouse: boolean;
  sales_channels: [];
  branch_id: string;
  branch_name: string;
}

export interface Currencies {
  currency_id: string;
  currency_code: string;
  currency_name: string;
  currency_name_formatted: string;
  currency_symbol: string;
  price_precision: number;
  currency_format: string;
  show_in_storefront: boolean;
  auto_exchange_rate: string;
  is_base_currency: boolean;
  exchange_rate: number;
  effective_date: string;
}

export interface ChatOfAccounts {
  account_id: string;
  account_name: string;
  account_code: string;
  account_type: string;
  is_user_created: boolean;
  is_system_account: boolean;
  is_active: boolean;
  is_involved_in_transaction: boolean;
  parent_account_id: string;
  parent_account_name: string;
}

export interface Contacts {
  contact_id: string;
  contact_name: string;
  customer_name: string;
  vendor_name: string;
  company_name: string;
  website: string;
  language_code: string;
  language_code_formatted: string;
  contact_type: string;
  contact_type_formatted: string;
  status: string;
  customer_sub_type: string;
  source: string;
  is_linked_with_zohocrm: string;
  payment_terms: string;
  payment_terms_label: string;
  currency_id: string;
  twitter: string;
  facebook: string;
  currency_code: string;
  outstanding_receivable_amount: number;
  outstanding_receivable_amount_bcy: number;
  outstanding_payable_amount: number;
  outstanding_payable_amount_bcy: number;
  unused_credits_receivable_amount: number;
  unused_credits_payable_amount: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  mobile: string;
  portal_status: string;
}

export interface Transporters {
  transporter_id: string;
  transporter_name: string;
  transporter_registration_id: string;
}


export interface ZohoCustomerDetailResponse {
  code?: number;
  message?: string;
  contacts?: Contacts[];
  page_context?: PageContext;
}