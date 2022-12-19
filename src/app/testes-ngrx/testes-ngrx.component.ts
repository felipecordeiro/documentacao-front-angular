import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, distinctUntilChanged, exhaustMap, forkJoin, map, Observable, of, take, tap } from 'rxjs';
import { ICarteira } from '../core/models/ICarteira';
import { ICliente } from '../core/models/ICliente';
import { IState } from '../core/models/IState';
import { resetCarteira, selecionarCarteira } from '../core/store/actions/carteira.actions';
import { selecionarCliente } from '../core/store/actions/cliente.actions';
import { selectCarteira, selectCodigoCarteira } from '../core/store/selectors/carteira.selector';
import { selectCliente, selectCodigoCliente } from '../core/store/selectors/cliente.selector';

@Component({
  selector: 'app-testes-ngrx',
  templateUrl: './testes-ngrx.component.html',
  styleUrls: ['./testes-ngrx.component.scss']
})
export class TestesNgrxComponent implements OnInit {

  dados$: Observable<{codigoCliente: number, codigoCarteira: number}>
  codigoCarteira$: Observable<number>

  clienteCount = 1
  carteiraCount = 1

  constructor(private store: Store<IState>) {
    
   }

  ngOnInit(): void {
    // this.dados$ = combineLatest([this.store.select(selectCodigoCliente), this.store.select(selectCodigoCarteira)])
    // .pipe(
    //   distinctUntilChanged((prev, curr) => prev[1] === curr[1]),
    //   tap(([codigoCliente, codigoCarteira]) => console.log(`cliente: ${codigoCliente} carteira: ${codigoCarteira}`)),
    //   map(([codigoCliente, codigoCarteira]) => {
    //     return { codigoCliente, codigoCarteira }
    //   })
    // )
    this.codigoCarteira$ = this.store.select(selectCodigoCarteira).pipe(
      exhaustMap(() => this.store.select(selectCodigoCliente).pipe(take(1)))
    )
    this.dados$ = combineLatest([this.store.select(selectCodigoCliente), this.codigoCarteira$])
    .pipe(
      tap(([codigoCliente, codigoCarteira]) => console.log(`cliente: ${codigoCliente} carteira: ${codigoCarteira}`)),
      map(([codigoCliente, codigoCarteira]) => {
        return { codigoCliente, codigoCarteira }
      })
    )
    
    
    
  }

  selecionarCliente1(){
    this.store.dispatch(selecionarCliente({
      codigo: 1,
      nome: 'Cliente 1'
    }))
  }

  selecionarCliente2(){
    this.store.dispatch(selecionarCliente({
      codigo: 2,
      nome: 'Cliente 2'
    }))
  }

  aumentaCliente(){
    this.clienteCount++
    this.store.dispatch(selecionarCliente({
      codigo: this.clienteCount,
      nome: `Cliente ${this.clienteCount}`
    }))
  }

  selecionarCarteira1(){
    this.store.dispatch(selecionarCarteira({
      codigo: 1,
      nome: 'Carteira 1'
    }))
  }
  
  selecionarCarteira2(){
    this.store.dispatch(selecionarCarteira({
      codigo: 2,
      nome: 'Carteira 2'
    }))
  }

  aumentaCarteira(){
    this.carteiraCount++
    this.store.dispatch(selecionarCarteira({
      codigo: this.carteiraCount,
      nome: `Carteira ${this.carteiraCount}`
    }))
  }

  resetCarteira(){
    this.store.dispatch(resetCarteira())
  }

  mudaCarteiraSelecionadaAoMudarCliente(){
    this.selecionarCliente2()
    setTimeout(() => {
      this.selecionarCarteira2()
    }, 2000);
  }
}
