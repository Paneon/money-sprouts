import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { PlanComponent } from './pages/plan/plan.component';
import { RoutePath } from './enum/routepath';

const routes: Routes = [
    {
        path: '',
        redirectTo: RoutePath.Home,
        pathMatch: 'full',
    },
    {
        path: RoutePath.Plan,
        component: PlanComponent,
    },
    {
        path: '**',
        redirectTo: 'home',
    },
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes, { enableTracing: false }),
    ],
    exports: [RouterModule, CommonModule],
})
export class AppRoutingModule {}
