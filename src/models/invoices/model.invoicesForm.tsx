 interface IProps {
  getInvoiceId: any
}
interface IState {
  category: JSX.Element[]
  locations: JSX.Element[]
  routePacks: string | null
  routeUser: string | null
  search: string
  usersRows: JSX.Element[]
  userFounded: boolean
  userData: any
  price: number
  packName: String
  categoryInput: any
  locationInput: any
  priceTypeInput: any
  categoryValue: any
  locationValue: any
  priceTypeValue: any
  packData: any
  userId: any
  route: any
  title: String
  invoiceTable: JSX.Element[]
}

export type {IProps, IState}