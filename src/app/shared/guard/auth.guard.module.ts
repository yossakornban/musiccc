import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { ServiceModule } from '../services/service.module';

@NgModule({
     providers: [ AuthGuard ]
     , imports: [ ServiceModule ]
})
export class AuthGuardModule { }
