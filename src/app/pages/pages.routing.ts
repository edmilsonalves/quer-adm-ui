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
            { path: 'maps', loadChildren: './maps/maps.module#MapsModule', data: { breadcrumb: 'Maps' } },
            { path: 'charts', loadChildren: './charting/charting.module#ChartingModule', data: { breadcrumb: 'Charts' } },
            { path: 'ui', loadChildren: './ui/ui.module#UiModule', data: { breadcrumb: 'UI' } },
            { path: 'tools', loadChildren: './tools/tools.module#ToolsModule', data: { breadcrumb: 'Tools' } },
            { path: 'mail', loadChildren: './mail/mail.module#MailModule', data: { breadcrumb: 'Mail' } },
            { path: 'calendar', loadChildren: './calendar/calendar.module#CalendarModule', data: { breadcrumb: 'Calendar' } },
            { path: 'form-elements', loadChildren: './form-elements/form-elements.module#FormElementsModule', data: { breadcrumb: 'Form Elements' } },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule', data: { breadcrumb: 'Tables' } },
            { path: 'editors', loadChildren: './editors/editors.module#EditorsModule', data: { breadcrumb: 'Editors' } },
            { path: 'profile', loadChildren: './profile/profile.module#ProfileModule', data: { breadcrumb: 'Profile' }  },      
            { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' } },
            { path: 'blank', component: BlankComponent, data: { breadcrumb: 'Blank page' } }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);