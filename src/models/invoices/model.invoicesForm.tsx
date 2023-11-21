 interface IProps {
  getInvoiceId: any
}
interface IState {
  category: JSX.Element[]
  locations: JSX.Element[]
  invoiceTable: JSX.Element[]
  usersRows: JSX.Element[]
  routePacks: any | null 
  routeUser: any | null
  search: any
  userFounded: boolean
  userData: any
  price: number
  packName: any
  categoryInput: any
  locationInput: any
  priceTypeInput: any
  categoryValue: any
  locationValue: any
  priceTypeValue: any
  packData: any
  userId: any
  route: any
  title: any
  invoiceData: any
  eventData: any
  companyName: any
  address: any
  zip: any
  country: any
  vat: any
  coupons: any
  paymentStatus: any
  paymentMethod: any
  loaded: any
}

export type {IProps, IState}