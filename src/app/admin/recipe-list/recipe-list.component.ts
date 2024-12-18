import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  searchRecipe:string=""
  allRecipes: any = []

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getAllRecipe()
  }

  getAllRecipe() {
    this.api.getAllRecipeApi().subscribe((res: any) => {
      this.allRecipes = res
      console.log(this.allRecipes);

    })
  }

  removeRecipe(id:string){
    this.api.deleteRecipeApi(id).subscribe((res:any)=>{
      this.getAllRecipe()
    })
  }
}