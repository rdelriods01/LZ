import {Component, ViewChild, Input, AfterViewInit, forwardRef, Output,EventEmitter} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

const Flatpickr = require("flatpickr");

@Component({
    selector: 'datepicker',
    template: `
        <div >
            <input #date (change)="salida($event)" data-input>
            <button style="min-width:1em; font-size:1.2em" mat-button  *ngIf="clear" (click)="clearDate()">X</button>
        </div>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FlatpickerComponent),
            multi: true
        }
    ]
})
export class FlatpickerComponent implements AfterViewInit {
    @ViewChild('date') dateEl: any;
    @Input() dateVal: any;
    @Input() clear: boolean = false;
    @Input() time: boolean = false;
    @Input() fechaMin:string='today';
    @Input() sticky:boolean=false;
    @Input() jump:any;
    @Output() mifecha = new EventEmitter();
    
    picker: any;
    finalVal: string;
    days:string[]=[
        'Sun','Mon','Tue','Wed','Thu','Fri','Sat'
    ]
    dn:any;

    constructor() {
         Flatpickr.localize(require('../../assets/es.js').es);
    }
    ngOnChanges(changes){
        if(this.picker){
            this.picker.setDate(this.jump);
        }
    }
    salida(event){
        this.mifecha.emit({mifecha: this.finalVal,midia: this.dn});
    }
    
    ngAfterViewInit() {
        this.picker = new Flatpickr(this.dateEl.nativeElement, {
            // minDate: 'today',
            inline:this.sticky,
            minDate:this.fechaMin,
            altInput: true,
            defaultDate: this.finalVal,
            enableTime: this.time,
            altFormat: this.time ? 'd-M-y a \\la\\s h:i K' : 'd-M-y',
            onChange: (date, fecha ,picker) => {
                this.propagateChange(date[0] || '');
                this.finalVal=fecha;
                if(date[0]){
                    let g=date[0].toString().split(" ");
                    for(let k=0;k<7;k++){
                        if(g[0]==this.days[k]){
                            this.dn=k;
                        }
                    }
                }
                this.salida(this.finalVal);
            }
        });
    }

    clearDate() {
        this.picker.clear();
        this.propagateChange('');
    }

    writeValue(value: any) {
        if (value !== undefined) {
            this.dateVal = value;
            if (this.picker) this.picker.setDate(value);
            this.finalVal = value;
        }
    }

    propagateChange = (_: any) => {};

    registerOnChange(fn) {
        this.propagateChange = fn;
    }
}