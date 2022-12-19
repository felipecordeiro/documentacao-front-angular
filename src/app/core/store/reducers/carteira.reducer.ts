import { createReducer, on } from '@ngrx/store';
import { ICarteira } from '../../models/ICarteira';
import { resetCarteira, selecionarCarteira } from '../actions/carteira.actions';

export const initialState: ICarteira = {
    codigo: 0,
    nome: ''
};

export const carteiraReducer = createReducer(
  initialState,
  on(selecionarCarteira, (state, {codigo, nome}) => {
    return {
        ...state,
        codigo,
        nome
    }
  }),
  on(resetCarteira, (state) => {
    return { 
        codigo: 0,
        nome: '' 
    }
  })
);