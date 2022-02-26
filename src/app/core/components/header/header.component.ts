import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'dfa-header',
    templateUrl: 'header.component.html'
})

export class HeaderComponent implements OnInit {

    @Input()
    titulo = ''

    constructor() { }

    ngOnInit() { }
}