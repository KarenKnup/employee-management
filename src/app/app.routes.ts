import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import {Layout} from "./pages/layout/layout";
import {Dashboard} from "./pages/dashboard/dashboard";
import {Employee} from "./pages/employee/employee";
import {NewLeave} from "./pages/new-leave/new-leave";
import { EarnedLeave } from './pages/earned-leave/earned-leave';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: '',
        component: Layout,
        children: [
            {
                path: 'dashboard',
                component: Dashboard
            },
            {
                path: 'employee',
                component: Employee
            },
            {
                path: 'leave-request',
                component: NewLeave
            },
            {
                path: 'earned-leave',
                component: EarnedLeave
            }
        ]
    }
];
