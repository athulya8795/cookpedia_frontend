import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-save-recipe',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './save-recipe.component.html',
  styleUrl: './save-recipe.component.css'
})
export class SaveRecipeComponent {
  // create a property to store array of saved recipes
  allRecipes: any = []
  // api service dependency injection
  constructor(private api: ApiService) { }
  // define a function for all saverrecipe api using service
  ngOnInit() {
    this.getAllSavedRecipe()
  }
  // call the function for saverecipe api using api service
  getAllSavedRecipe() {
    this.api.getUserSaveRecipeApi().subscribe((res: any) => {
      this.allRecipes = res
      console.log(this.allRecipes);
    })
  }

  removeSavedRecipe(id: string) {
    this.api.deleteUserSaveRecipeApi(id).subscribe((res: any) => {
      this.getAllSavedRecipe()
    })
  }
}