import { NgModule } from '@angular/core';
import { EllipsisPipe } from './ellipsis.pipe'

@NgModule({
    imports: [],
    declarations: [EllipsisPipe],
    exports: [EllipsisPipe],
})

export class PipeModule {

    static forRoot() {
        return {
            ngModule: PipeModule,
            providers: [],
        };
    }
} 