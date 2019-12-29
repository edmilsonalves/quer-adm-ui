import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages.component';
import { BlankComponent } from './blank/blank.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
    {
        path: '', 
        component: PagesComponent,
        children:[
            { path:'', redirectTo:'dashboard', pathMatch:'full' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', data: { breadcrumb: 'Dashboard' }  },
            { path: 'gerenciar-produtos', loadChildren: './gerenciar-produtos/gerenciar-produtos.module#GerenciarProdutosModule', data: { breadcrumb: 'Gerenciar produtos' }  },
            { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' } },
            { path: 'blank', component: BlankComponent, data: { breadcrumb: 'Blank page' } }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);