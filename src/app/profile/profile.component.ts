import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  profileImage: any = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSMHYgVLOq_tXV-S2GPMnTsHTCum4xoHTDmg&s"

  allUserDownloadList: any = []
  constructor(private api: ApiService) { }

  ngOnInit(){
    this.getUserDownloads()
    const user=JSON.parse(sessionStorage.getItem("user")||"")
    if(user.profilePic)
    {
      this.profileImage=user.profilePic
    }
  }

  getUserDownloads() {
    this.api.getUserDownloadRecipeApi().subscribe((res: any) => {
      this.allUserDownloadList = res
      console.log(this.allUserDownloadList);
    })
  }

  getFile(event: any) {
    let uploadFile = event.target.files[0]
    // convert file into url
    let fr = new FileReader()
    fr.readAsDataURL(uploadFile)
    fr.onload = (event: any) => {
      this.profileImage = event.target.result
    }
  }

  updateProfile() {
    this.api.editUserApi({ profilePic: this.profileImage }).subscribe((res: any) => {
      sessionStorage.setItem("user", JSON.stringify(res))
      this.profileImage = res.profilePic
      alert("Profile Updated successfully!!!")
    })
  }
}