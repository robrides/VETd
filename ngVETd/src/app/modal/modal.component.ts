import { MentorMentee } from './../models/mentor-mentee';
import { ProfileComponent } from './../components/profile/profile.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogData } from '../DialogData';
import { Profile } from '../models/profile';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { Review } from '../models/review';
import { Message } from '../models/message';


@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"]
})
export class ModalComponent implements OnInit {
  profile = null;
  mentees = [];
  jobs = [];
  myProfile = null;
  review = new Review();
  showChat = false;
  message = new Message();
  menteeId = 0;
  mentorId = 0;
  mentorMenteeId = 0;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private profileService: ProfileService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.profile = this.data.profile;
    this.myProfile = this.data.myProfile;
    console.log(this.profile);
    console.log(this.myProfile);

    this.addMenteesOrMentors();

    console.log("in init");
  }
  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1) {
      return Math.round(value / 5);
    }

    return value;
  }

  removeMentee(p) {
    this.profile = p;
    console.log("trying to remove " + this.profile.firstName);
    this.profileService
      .removeMenteeFromMentorList(this.profile)
      .subscribe(good => {
        console.log("closing window");
        // this.profile = this.profileComp.getProfile();
        // this.profileComp.getListOfMenteesByMentorId(this.profile);
        this.onNoClick();
      });
  }
  addMenteeToMentorMenteeList(p) {
    this.profile = p;
    console.log("added " + this.profile.firstName + " to list");
    this.profileService.addMenteeToMentorList(this.profile).subscribe(
      good => {
      },
      bad => {
        console.log("error adding mentee");

      }
    );
  }
  addMenteesOrMentors() {
    if (this.profile.mentor != null) {
      this.mentees = this.profile.mentor.mentorMentees;
      this.jobs = this.profile.mentor.jobs;
      this.mentorId = this.profile.mentor.id;
      this.menteeId = this.myProfile.mentee.id;


      console.log(this.mentees);

      for(let i = 0; i < this.mentees.length; i++) {
        console.log('mentee'+this.mentees[1].mentee.id);
        console.log('mentees'+this.mentees[1].mentees.id);

      }
    } else {
      this.mentorId = this.myProfile.mentor.id;
      this.menteeId = this.profile.mentee.id;


      this.jobs = this.profile.mentee.jobs;
      this.mentees = this.myProfile.mentor.mentorMentees;

      console.log(this.mentees.length);

      for(let i = 0; i < this.mentees.length; i++) {
          console.log('mentee'+this.mentees[i].mentee.id);
          console.log('mentees'+this.mentees[i].mentees.id);
          if(this.mentees[i].mentee.id === this.myProfile.mentee.id){

          }

      }
    }
  }
  chat(){
    this.showChat = true;
    console.log('new message');

  }
  submitMessage(){
    this.message.profileId = this.myProfile.id;
    console.log(this.message.text);
    console.log(this.message.profileId);
    this.profileService.submitMessage(this.message, this.profile.id).subscribe(
        good => {
          console.log(good);


        }
      );
    this.message = new Message();
  }
}
