import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ProfileComponent } from './profile/profile.component';
import { SaveRecipeComponent } from './save-recipe/save-recipe.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    // lazy loaded admin module
    {
        path: 'admin',canActivate:[authGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    },
    {
        path: '', component: HomeComponent
    },
    {
        path: 'about', component: AboutComponent
    },
    {
        path: 'contact', component: ContactComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'all-recipes', component: RecipesComponent
    },
    {
        path: 'profile',canActivate:[authGuard], component: ProfileComponent
    },
    {
        path: 'save-recipe',canActivate:[authGuard], component: SaveRecipeComponent
    },
    {
        path: 'recipe/:id/view',canActivate:[authGuard], component: ViewRecipeComponent
    },
    {
        path: '**', component: PagenotfoundComponent
    }
];