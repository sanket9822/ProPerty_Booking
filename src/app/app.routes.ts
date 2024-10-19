import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { LayoutComponent } from './Pages/layout/layout.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { PropertyTypeComponent } from './Pages/property-type/property-type.component';
import { SiteComponent } from './Pages/site/site.component';
import { BookingComponent } from './Pages/booking/booking.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'',
        component:LayoutComponent,
        children:[
            {
                path:'dashboard',
                component:DashboardComponent
            },
            {
                path:'property-Type',
                component:PropertyTypeComponent
            },
            {
                path:'site',
                component:SiteComponent
            },
            {
                path:'booking',
                component:BookingComponent
            }
        ]
    }
];
