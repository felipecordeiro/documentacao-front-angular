import { createAction, props } from '@ngrx/store';

export const selecionarCarteira = createAction('[Carteira] selecionar', props<{nome: string
    codigo: number}>());
export const resetCarteira = createAction('[Carteira] reset');