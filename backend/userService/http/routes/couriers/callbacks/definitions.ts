/* eslint-disable no-shadow */
export enum ECourierRoute {
  GetCouriers =     '/api/user/couriers',
  GetCourier =      '/api/user/couriers/:id',
  RegisterCourier = '/api/user/couriers',
  DeleteCourier =   '/api/user/couriers/:id',
  UpdateCourier =   '/api/user/couriers/:id',
  SetWorkingDay =   '/api/user/couriers/set-working-day'
}
