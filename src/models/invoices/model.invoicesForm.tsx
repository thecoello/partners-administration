 interface IProps {
  getInvoiceId: any
}
interface IState {
  category: JSX.Element[]
  locations: JSX.Element[]
  invoiceTable: JSX.Element[]
  usersRows: JSX.Element[]
  routePacks: string | null 
  routeUser: string | null
  search: string
  userFounded: boolean
  userData: any
  price: number
  packName: string
  categoryInput: any
  locationInput: any
  priceTypeInput: any
  categoryValue: string
  locationValue: string
  priceTypeValue: string
  packData: any
  userId: any
  route: any
  title: string
  invoiceData: any
  eventData: any
  companyName: string
  address: string
  zip: string
  country: string
  vat: string
  coupons: string
  paymentStatus: any
  paymentMethod: string
}

export type {IProps, IState}