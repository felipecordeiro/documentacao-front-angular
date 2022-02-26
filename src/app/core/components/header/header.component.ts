import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'dfa-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})

export class HeaderComponent implements OnInit {

    @Input()
    titulo = ''

    constructor() { }

    ngOnInit() { }
}