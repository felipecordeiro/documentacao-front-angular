import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  form: UntypedFormGroup

  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.maxLength(50)]],
      idade: [null, [Validators.required, Validators.min(0), Validators.max(99)]],
      dataNascimento: [null, [Validators.required]],
      observacao: [null, [Validators.required, Validators.maxLength(300)]],
    })
  }

  salvar(){
    console.log(this.form.value)
  }

}
