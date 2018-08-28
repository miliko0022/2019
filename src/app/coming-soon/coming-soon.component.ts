import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatabaseService } from '../shared/security/database.service';
import { trigger, style, animate, transition, state } from '@angular/animations';
import * as Parallax from 'parallax-js';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.css'],
  animations: [
    // trigger('islandAnimation', [
    //   state('stillBellStillSwing', style({})),
    //   state('stillBellAwaySwing', style({})),
    //   state('stillBellCrossSwing', style({})),
    //
    //   state('leftBellStillSwing', style({})),
    //   state('leftBellAwaySwing', style({})),
    //   state('leftBellCrossSwing', style({})),
    //
    //   state('rightBellStillSwing', style({})),
    //   state('rightBellAwaySwing', style({})),
    //   state('rightBellCrossSwing', style({})),
    //   transition('* <=> *', animate('1000ms')),
    //   // transition('still => left', animate('1000ms ease-out')),
    //   // transition('left => still', animate('1000ms ease-in')),
    //   // transition('still => right', animate('1000ms ease-out')),
    //   // transition('right => still', animate('1000ms ease-in')),
    // ])
  ]
})
export class ComingSoonComponent implements OnInit {
  emailInput: string;
  EMAIL_SAVED_MSG = 'Email has been added!';
  INCORRECT_EMAIL_MSG = 'Incorrect email format';
  isMobile = false;

  facebookPath = "../../assets/comingSoonImgs/social-media/facebook.png";
  facebookHoveredPath = "../../assets/comingSoonImgs/social-media/hoverFacebook.png";
  instagramPath = "../../assets/comingSoonImgs/social-media/instagram.png";
  instagramHoveredPath = "../../assets/comingSoonImgs/social-media/hoverInsta.png";
  twitterPath = "../../assets/comingSoonImgs/social-media/twitter.png";
  twitterHoveredPath = "../../assets/comingSoonImgs/social-media/twitterHover.png";
  snapchatPath = "../../assets/comingSoonImgs/social-media/snapchat.png";
  snapchatHoveredPath = "../../assets/comingSoonImgs/social-media/snapchatHover.png";

  desktopIslandPath = '../../assets/comingSoonImgs/island.png';
  mobileIslandPath = '../../assets/comingSoonImgs/island(mobile).png';

  islandPath = this.desktopIslandPath;

  facebookSrc = this.facebookPath;
  instagramSrc = this.instagramPath;
  twitterSrc = this.twitterPath;
  snapchatSrc = this.snapchatPath;

  constructor(private databaseService: DatabaseService, private snackbar: MatSnackBar) {
    this.checkIfMobile();
  }

  ngOnInit() {
    window.addEventListener('resize', this.checkIfMobile.bind(this));
  }

  ngAfterViewInit() {

  }

  ngAfterContentInit() {
    const leftCloudScene = document.getElementById('leftCloudScene');
    const parallaxInstance = new Parallax(leftCloudScene);
    const rightCloudScene = document.getElementById('rightCloudScene');
    const parallaxInstance2 = new Parallax(rightCloudScene);
    const islandScene = document.getElementById('islandScene');
    const parallaxInstance3 = new Parallax(islandScene);
    const mainTextScene = document.getElementById('mainTextScene');
    const parallaxInstance4 = new Parallax(mainTextScene);
  }

  checkIfMobile() {
    console.log(window);
    if (window.screen.width <= 450 || window.innerWidth <= 400) {
      this.isMobile = true;
      this.islandPath = this.mobileIslandPath;
    } else {
      this.isMobile = false;
      this.islandPath = this.desktopIslandPath;
    }
  }

  addEmail() {
    if (this.emailInput == '') {
      return;
    }

    if (!this.validateEmail(this.emailInput)) {
      // Notify user of what went wrong
      this.snackbar.open(this.INCORRECT_EMAIL_MSG, 'Close', {
        duration: 5000,
      });

      return;
    }
    //save user email
    this.databaseService.addInterestedUserEmail(this.emailInput);
    // Show Success message
    this.snackbar.open(this.EMAIL_SAVED_MSG, 'Close', {
      duration: 5000,
    });
  }

  validateEmail(email: string) {
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    // alert("You have entered an invalid email address!");
    return false;
  }

  facebookHovered(event) {
    this.facebookSrc = this.facebookHoveredPath;
  }
  facebookHoverOut(event) {
    this.facebookSrc = this.facebookPath;
  }

  instagramHovered(event) {
    this.instagramSrc = this.instagramHoveredPath;
  }
  instagramHoverOut(event) {
    this.instagramSrc = this.instagramPath;
  }

  twitterHovered(event) {
    this.twitterSrc = this.twitterHoveredPath;
  }
  twitterHoverOut(event) {
    this.twitterSrc = this.twitterPath;
  }

  snapchatHovered(event) {
    this.snapchatSrc = this.snapchatHoveredPath;
  }
  snapchatHoverOut(event) {
    this.snapchatSrc = this.snapchatPath;
  }

  startCountDown() {
    // set up count down interval
    // let countDownInterval = setInterval(function(){
    //   let currentTime = new Date().getTime();
    //   let timeDifference = this.eventDate - currentTime;
    //   if (timeDifference <= 0) {
    //     clearInterval(countDownInterval);
    //     this.countDownText = 'Welcome to the Swamp!';
    //   }
    //   let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    //   let hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //   let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    //   let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    //
    //   this.countDownText = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    // }.bind(this), 1000);
  }
}
