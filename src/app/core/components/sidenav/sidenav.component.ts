import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  navigate =
    [
      {
        title : 'MOVIES.TITLE',
        url   : '/movies',
        icon  : 'film-outline'
      },
      {
        title : 'ACTORS.TITLE',
        url   : '/actors',
        icon  : 'person-outline'
      },
      {
        title : 'COMPANIES.TITLE',
        url   : '/companies',
        icon  : 'videocam-outline'
      },
    ];

  constructor() { }

  ngOnInit(): void {
  }

}
