import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Sector } from "../models/sector";
import { AuthService } from "./auth.service";
import { Job } from "../models/job";
import { Profile } from "../models/profile";
import { Mentor } from "../models/mentor";
import { Mentee } from "../models/mentee";

@Injectable({
  providedIn: "root"
})
export class ProfileService {
  //
  // F E I L D S
  //
  private url = environment.baseUrl + "api";
  constructor(private http: HttpClient, private auth: AuthService) {}
  //
  // M E T H O D S
  //
  getSectors(): Observable<Sector[]> {
    const credentials = this.auth.getCredentials();
    const myHeaders = {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: "Basic " + this.auth.getCredentials()
    };
    return this.http.get<Sector[]>(this.url + "/sectors", {
      headers: myHeaders
    });
  }

  getJobs(): Observable<Job[]> {
    const credentials = this.auth.getCredentials();
    const myHeaders = {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: "Basic " + this.auth.getCredentials()
    };
    return this.http.get<Job[]>(this.url + "/jobs", { headers: myHeaders });
  }

  addJobs(newJobs: Job[]) {
    const myHeaders = {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: "Basic " + this.auth.getCredentials(),
      "Content-Type": "application/json"
    };
    return this.http.put<Job[]>(this.url + "/add/jobs", newJobs, {
      headers: myHeaders
    });
  }

  update(editProfile) {
    // const upUrl = this.url + "/" + updateTodo.id;
    const myHeaders = {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: "Basic " + this.auth.getCredentials(),
      "Content-Type": "application/json"
    };
    return this.http.put<Profile>(this.url + "/" + editProfile.id, editProfile, {
      headers: myHeaders
    });
  }


  removeJob(job){
    const myHeaders = {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: "Basic " + this.auth.getCredentials(),
      "Content-Type": "application/json"
    };

    return this.http.put<Profile>(this.url + "/remove/jobs", job, {headers: myHeaders});
  }



  getProfile() {
    return this.http.get<Profile>(this.url + "/profile", {
      headers: myHeaders
    });
  }
}
