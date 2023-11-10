interface IProps {
  setInvoiceId: any
}

interface IState {
  invoicesRows: JSX.Element[]
  route: string | null
  firstPageURL: string | null
  prevPageURL: string | null
  nextPageURL: string | null
  search: string
}

export type {IState, IProps}