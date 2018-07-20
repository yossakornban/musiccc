import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
import { ServiceModule } from '../services/service.module';

@NgModule({
     providers: [ AuthGuard, RoleGuard ]
     , imports: [ ServiceModule ]
})
export class GuardModule { }
