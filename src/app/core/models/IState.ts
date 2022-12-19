import { ICarteira } from "./ICarteira"
import { ICliente } from "./ICliente"

export interface IState {
    cliente: ICliente
    carteira: ICarteira
}