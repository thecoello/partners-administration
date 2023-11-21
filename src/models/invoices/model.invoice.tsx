export default class Invoice{
  id?: number
  user_id?: number
  pricetype?: string
  company_name?: string
  category?: string
  location?: string
  quantity?: number
  vat?: string
  subtotal?: number
  iva?: number
  total?: number
  address?: string
  zip?: string
  country?: string
  invoice_number?: string
  payment_status?: string
  payment_method?: string
  invoice_date?: string
  name?: string
  contact?: string
  email?: string
  contract_file?:string
  coupons?: string
  voucher?:string
}