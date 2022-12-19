import { createReducer, on } from '@ngrx/store';
import { ICliente } from '../../models/ICliente';
import { resetCliente, selecionarCliente } from '../actions/cliente.actions';

export const initialState: ICliente = {
    codigo: 0,
    nome: ''
};

export const clienteReducer = createReducer(
  initialState,
  on(selecionarCliente, (state, {codigo, nome}) => {
    return {
        ...state,
        codigo,
        nome
    }
  }),
  on(resetCliente, (state) => {
    return { 
        codigo: 0,
        nome: '' 
    }
  })
);