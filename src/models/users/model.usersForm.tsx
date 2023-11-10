interface IProps {
  getUserId: any
}

interface IState {
  route: null | string
  title: string
  companyName: string
  name: string
  email: string
  password: string
  userType: string
}

export type {IState, IProps}