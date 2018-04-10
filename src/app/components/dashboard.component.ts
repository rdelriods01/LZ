import { Component } from '@angular/core';

@Component({
  selector: 'dashboardC',
  templateUrl: '../views/dashboard.html',
  styleUrls: ['../css/dashboard.css']
})
export class DashboardComponent {
    
   F:any;
   d:any;
   dn:any;
   dia:any;
   m:any;
   mes:any;
   y:any;
   h:any;
   miFechaDeCitas:string;
   nombreMes:string[]=[
        'enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'
    ];
   nombreDia:string[]=[
    'Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'
  ]
  //  min:string="2016-06-21";
  min:string="2016-01-01";


  constructor(){  
          this.getHoy();
          this.parseFecha();
  }

  getHoy(){
    this.F = new Date();
    this.d=this.F.getDate();
    if(this.d<10){this.d=('0'+this.d)}
    this.m=this.F.getMonth()+1;
    if(this.m<10){this.m=('0'+this.m)}
    this.y=this.F.getFullYear();
    this.dn=this.F.getDay();

  }
  
  parseFecha(){
    this.miFechaDeCitas=(this.y+'-'+this.m+'-'+this.d);
    this.mes=this.m;
    for(let j=1;j<=12;j++){
        if(this.mes==j){
            this.mes=this.nombreMes[j-1];
        }
    }
    for(let k=0;k<7;k++){
      if(this.dn==k){
        this.dia=this.nombreDia[k];
      }
    }
  }

  // Botones de la fecha
  today(){
    this.d=this.F.getDate();
    if(this.d<10){this.d=('0'+this.d)}
    this.m=this.F.getMonth()+1;
    if(this.m<10){this.m=('0'+this.m)}
    this.y=this.F.getFullYear();
    this.dn=this.F.getDay();
    this.parseFecha();
  }
  diaMenos(){
    this.d--;
    if(this.d<10){this.d=('0'+this.d)}
    if(this.d<1){
      this.m--;
      if(this.m<10){this.m=('0'+this.m)}
      if(this.m<1){
        this.y--;
        this.m=12;
        this.d=31;
      }
      // if(this.m==2){this.d=28}
      if(this.m==2){
        if ((this.y % 4 == 0) && ((this.y % 100 != 0) || (this.y % 400 == 0))){ //si es bisiesto
          this.d=29;
        }else{
          this.d=28;
        }
      }
      if(this.m==1||this.m==3||this.m==5||this.m==7||this.m==8||this.m==10||this.m==12){this.d=31}
      if(this.m==4||this.m==6||this.m==9||this.m==11){this.d=30}
    }
    this.dn--;
    if(this.dn<0){this.dn=6}
    this.parseFecha();
  }
  diaMas(){
    this.d++;
    if(this.d<10){this.d=('0'+this.d)}
    if(this.m==1||this.m==3||this.m==5||this.m==7||this.m==8||this.m==10||this.m==12){
      if(this.d>31){
        this.m++;
        if(this.m<10){this.m=('0'+this.m)}
        if(this.m>12){
          this.y++;
          this.m=1;
          if(this.m<10){this.m=('0'+this.m)}
          this.d=('0'+1);
        }
        this.d=('0'+1);
      }
    }
    if (this.m==4||this.m==6||this.m==9||this.m==11){
      if(this.d>30){
        this.m++;
        if(this.m<10){this.m=('0'+this.m)}
        this.d=('0'+1);
      }
    }
    if(this.m==2){
      if ((this.y % 4 == 0) && ((this.y % 100 != 0) || (this.y % 400 == 0))){ //si es bisiesto
        if(this.d>29){
          this.m++;
          if(this.m<10){this.m=('0'+this.m)}
          this.d=('0'+1);
        }
      }else{
        if(this.d>28){
          this.m++;
          if(this.m<10){this.m=('0'+this.m)}
          this.d=('0'+1);
        }
      }
      
    }
    this.dn++;
    if(this.dn>6){this.dn=0}
    this.parseFecha();
  }
  sendFecha(event){
        let fyh =event.mifecha.split(" ");
        let fechS=fyh[0].split("-");
        this.y=fechS[0];
        this.m=fechS[1];
        this.d=fechS[2];
        this.dn=event.midia;
        this.parseFecha();
    }

}