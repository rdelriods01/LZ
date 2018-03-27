import { Injectable } from '@angular/core';

interface Config {
  nombre: string;
  logoURL: string;
}

@Injectable()
export class ConfigService {

  cliente: Config;

  constructor() { 

    this.cliente={
        nombre: 'LIGHTZONE',
        logoURL:'assets/images/logo.png'
    }


  }


}