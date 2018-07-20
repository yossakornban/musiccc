import { NbMenuItem } from '@nebular/theme';
import { Title } from '@angular/platform-browser';

export const OFFICER : NbMenuItem[] = [

  {
    title: 'Dash Board',
    icon: 'ion-ios-paper',
    link: '/pages/officer/dashboard',
    children: [
      {
        title: "ทั้งหมด",
        link: '/pages/officer/dashboard/all',
      }, {
        title: "ประชาสัมพันธ์",
        link: '/pages/officer/dashboard/news',
      }, {
        title: "กิจกรรม",
        link: '/pages/officer/dashboard/activities',
      },
    ]
  },
  {
    title: 'News Manage',
    icon: 'ion-compose',
    link: '/pages/officer/annw01',
  },
  {
    title: 'User Manage',
    icon: 'ion-person',
    link: '/pages/officer/anum01',
  }
];

export const ADMIN : NbMenuItem[] = [

  {
    title: 'ADMIN',
    icon: 'ion-ios-paper',
    link: '/pages/officer/dashboard',
    children: [
      {
        title: "ทั้งหมด",
        link: '/pages/officer/dashboard',
      }, {
        title: "ประชาสัมพันธ์",
        link: '/pages/officer/dashboard',
      }, {
        title: "กิจกรรม",
        link: '/pages/officer/dashboard',
      },
    ]
  },
  {
    title: 'News Manage',
    icon: 'ion-compose',
    link: '/pages/officer/annw01',
  },
  {
    title: 'User Manage',
    icon: 'ion-person',
    link: '/pages/officer/anum01',
  }
];

export const MEMBER : NbMenuItem[] = [

  {
    title: 'MEMBER',
    icon: 'ion-ios-paper',
    link: '/pages/officer/dashboard',
    children: [
      {
        title: "ทั้งหมด",
        link: '/pages/officer/dashboard',
      }, {
        title: "ประชาสัมพันธ์",
        link: '/pages/officer/dashboard',
      }, {
        title: "กิจกรรม",
        link: '/pages/officer/dashboard',
      },
    ]
  },
  {
    title: 'News Manage',
    icon: 'ion-compose',
    link: '/pages/officer/annw01',
  },
  {
    title: 'User Manage',
    icon: 'ion-person',
    link: '/pages/officer/anum01',
  }
];
