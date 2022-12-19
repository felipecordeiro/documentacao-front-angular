import { createSelector } from "@ngrx/store";
import { IState } from "../../models/IState";

export const selectCarteira = (state: IState) => state.carteira;
export const selectCodigoCarteira = createSelector(
    selectCarteira,
    (state) => state.codigo
  );