import { createAction, props } from '@ngrx/store';

export const selecionarCliente = createAction('[Cliente] selecionar', props<{nome: string
    codigo: number}>());
export const resetCliente = createAction('[Cliente] reset');