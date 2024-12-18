import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeModel } from '../admin/model/recipeModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // server_url = "http://localhost:3000"
  server_url = "https://cookpedia-server-40ao.onrender.com"


  constructor(private http: HttpClient) { }
  getAllRecipeApi() {
    return this.http.get(`${this.server_url}/all-recipes`)
  }

  // add testimony
  addTestimonyApi(reqBody: any) {
    return this.http.post(`${this.server_url}/add-testimony`, reqBody)
  }

  // register
  registerApi(reqBody: any) {
    return this.http.post(`${this.server_url}/register`, reqBody)
  }

  // login
  loginApi(reqBody: any) {
    return this.http.post(`${this.server_url}/login`, reqBody)
  }

  // append Token in req header
  appendToken() {
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")
    if (token) {
      headers = headers.append("Authorization", `Bearer ${token}`)
    }
    return { headers }
  }

  // recipe
  viewRecipeApi(recipeId: string) {
    return this.http.get(`${this.server_url}/recipe/${recipeId}/view`, this.appendToken())
  }

  // related-recipes
  relatedRecipeApi(cuisine: string) {
    return this.http.get(`${this.server_url}/related-recipe?cuisine=${cuisine}`, this.appendToken())
  }

  // download Recipe
  downloadRecipeApi(recipeId: string, reqBody: any) {
    return this.http.post(`${this.server_url}/recipe/${recipeId}/download`, reqBody, this.appendToken())
  }

  // save Recipe
  saveRecipeApi(recipeId: string, reqBody: any) {
    return this.http.post(`${this.server_url}/recipe/${recipeId}/save`, reqBody, this.appendToken())
  }

  // get save Recipe
  getUserSaveRecipeApi() {
    return this.http.get(`${this.server_url}/get-save-recipes`, this.appendToken())
  }

  // remove save Recipe
  deleteUserSaveRecipeApi(id: string) {
    return this.http.delete(`${this.server_url}/save-recipes/${id}/remove`, this.appendToken())
  }

  // remove save Recipe
  getUserDownloadRecipeApi() {
    return this.http.get(`${this.server_url}/user-downloads`, this.appendToken())
  }

  // edit user pic
  editUserApi(reqBody: any) {
    return this.http.post(`${this.server_url}/user/edit`, reqBody, this.appendToken())
  }

  // all users
  allUserApi() {
    return this.http.get(`${this.server_url}/all-user`, this.appendToken())
  }

  // all downloads
  allDownloadApi() {
    return this.http.get(`${this.server_url}/all-download`, this.appendToken())
  }

  // all feedback

  allFeedbackApi() {
    return this.http.get(`${this.server_url}/all-feedback`, this.appendToken())
  }
// http://localhost:3000/feedback/67507cc0159f97716e91cc28/update?status=Rejected
  // update feedback
  updateFeedbackApi(feedbackId: string, status: string) {
    return this.http.get(`${this.server_url}/feedback/${feedbackId}/update?status=${status}`, this.appendToken())
  }

  // all-approved-feedback
  getAllApprovedFeedbackApi() {
    return this.http.get(`${this.server_url}/all-approve-feedback`)
  }

  // add recipe
  addRecipeApi(reqBody: any) {
    return this.http.post(`${this.server_url}/add-recipe`, reqBody, this.appendToken())
  }

  // edit recipe
  updateRecipeApi(id: string, reqBody: RecipeModel) {
    return this.http.put(`${this.server_url}/recipe/${id}/edit`, reqBody, this.appendToken())
  }

  // delete recipe
  deleteRecipeApi(id: string) {
    return this.http.delete(`${this.server_url}/recipe/${id}/remove`, this.appendToken())
  }

  // get chart data
  getChartData() {
    this.allDownloadApi().subscribe((res: any) => {
      let downloadArrayList: any = []
      let output: any = {}
      res.forEach((item: any) => {
        let cuisine = item.recipeCuisine
        let currentCount = item.count
        if (output.hasOwnProperty(cuisine)) {
          output[cuisine] += currentCount
        }
        else {
          output[cuisine] = currentCount
        }
      })
      console.log(output);
      for (let cuisine in output) {
        downloadArrayList.push({ name: cuisine, y: output[cuisine] })
      }
      console.log(downloadArrayList);
      localStorage.setItem("chart",JSON.stringify(downloadArrayList))
    })
  }
}