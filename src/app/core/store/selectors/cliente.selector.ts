import { createSelector } from "@ngrx/store";
import { IState } from "../../models/IState";

export const selectCliente = (state: IState) => state.cliente;
export const selectCodigoCliente = createSelector(
    selectCliente,
    (state) => state.codigo
  );