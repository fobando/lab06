import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AtmServiceService } from '../services/atm-service.service';

@Injectable()
export class TransGuardService implements CanActivate {

  constructor( public atmService: AtmServiceService) { }

  canActivate (): boolean {
    console.log('canActivate was called');
    return this.atmService.accountValid;
  }

}
