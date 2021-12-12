import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IMenuItem {
    id?: string;
    title?: string;
    description?: string;
    type: string;       // Possible values: link/dropDown/extLink
    name?: string;      // Used as display text for item and title for separator type
    state?: string;     // Router state
    icon?: string;      // Material icon name
    tooltip?: string;   // Tooltip text
    disabled?: boolean; // If true, item will not be appeared in sidenav.
    sub?: IChildItem[]; // Dropdown items
    badges?: IBadge[];
    active?: boolean;
}
export interface IChildItem {
    id?: string;
    parentId?: string;
    type?: string;
    name: string;       // Display text
    state?: string;     // Router state
    icon?: string;
    sub?: IChildItem[];
    active?: boolean;
}

interface IBadge {
    color: string;      // primary/accent/warn/hex color codes(#fff000)
    value: string;      // Display text
}

interface ISidebarState {
    sidenavOpen?: boolean;
    childnavOpen?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    public sidebarState: ISidebarState = {
        sidenavOpen: true,
        childnavOpen: false
    };
    selectedItem: IMenuItem;
    
    constructor() {
    }

    defaultMenu: IMenuItem[] = [
        {
            name: 'Clients',
            description: 'Gestion des clients',
            type: 'dropDown',
            icon: 'i-Administrator',
            sub: [
                { icon: 'i-Checked-User', name: 'Lister', state: '/client/list', type: 'link' },
                { icon: 'i-Add-User', name: 'Ajouter', state: '/client/add', type: 'link' },
                { icon: 'i-Find-User', name: 'Forgot', state: '/sessions/forgot', type: 'link' }
            ]
        },
        {   
            name: 'Livreur',
            description: 'Gestion des livreurs.',
            type: 'dropDown',
            icon: 'i-Car-2',
            sub: [
                { icon: 'i-Add-User', name: 'Ajouter un noveau livreur', state: '/livreurs/add', type: 'link' },
                { icon: 'i-Clock-3', name: 'Liste des livreurs', state: '/livreurs/list', type: 'link' },
            ]
        },
        {   
            name: 'Dashboard',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            type: 'dropDown',
            icon: 'i-Bar-Chart',
            sub: [
                { icon: 'i-Clock-3', name: 'Version 1', state: '/dashboard/v1', type: 'link' },
                { icon: 'i-Clock-4', name: 'Version 2', state: '/dashboard/v2', type: 'link' },
                { icon: 'i-Over-Time', name: 'Version 3', state: '/dashboard/v3', type: 'link' },
                { icon: 'i-Clock', name: 'Version 4', state: '/dashboard/v4', type: 'link' },
            ]
        },
        {
            name: 'Stock',
            description: 'Gestion des stocks',
            type: 'dropDown',
            icon: 'i-Shop-2',
            sub: [
                { icon: 'i-Pie-Chart-2', name: 'Statistiques', state: '/stock/stat', type: 'link' },
                { icon: 'i-Shop-2', name: 'Lister les stocks', state: '/stock/list', type: 'link' },
                {
                    icon: ' i-Add',
                    name: 'Ajouter..',
                    type: 'dropDown',
                    sub: [
                        { name: 'Ajouter Stock', state: '/stock/add', type: 'link' },
                    ]
                }]
        },
        {
            name: 'Apps',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            type: 'dropDown',
            icon: 'i-Computer-Secure',
            sub: [
                { icon: 'i-Add-File', name: 'Invoice Builder', state: '/invoice', type: 'link' },
                { icon: 'i-Email', name: 'Inbox', state: '/inbox', type: 'link' },
                { icon: 'i-Speach-Bubble-3', name: 'Chat', state: '/chat', type: 'link' },
                { icon: 'i-Calendar', name: 'Calendar', state: '/calendar', type: 'link' },
            ]
        },
        {
            name: 'Forms',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            type: 'dropDown',
            icon: 'i-File-Clipboard-File--Text',
            sub: [
                { icon: 'i-File-Clipboard-Text--Image', name: 'Basic components', state: '/forms/basic', type: 'link' },
                { icon: 'i-Split-Vertical', name: 'Form layouts', state: '/forms/layouts', type: 'link' },
                { icon: 'i-Receipt-4', name: 'Input Group', state: '/forms/input-group', type: 'link' },
                { icon: 'i-File-Edit', name: 'Input Mask', state: '/forms/input-mask', type: 'link' },
                { icon: 'i-Tag-2', name: 'Tag Input', state: '/forms/tag-input', type: 'link' },
                { icon: 'i-Width-Window', name: 'Wizard', state: '/forms/wizard', type: 'link' },
                { icon: 'i-Crop-2', name: 'Image Cropper', state: '/forms/img-cropper', type: 'link' },
            ]
        },
        {
            name: 'Data Tables',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            type: 'dropDown',
            icon: 'i-File-Horizontal-Text',
            sub: [
                { icon: 'i-File-Horizontal-Text', name: 'List', state: '/tables/list', type: 'link' },
                { icon: 'i-Full-View-Window', name: 'Fullscreen', state: '/tables/full', type: 'link' },
                { icon: 'i-Code-Window', name: 'Paging', state: '/tables/paging', type: 'link' },
                { icon: 'i-Filter-2', name: 'Filter', state: '/tables/filter', type: 'link' },
            ]
        },
        {
            name: 'Sessions',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            type: 'dropDown',
            icon: 'i-Administrator',
            sub: [
                { icon: 'i-Add-User', name: 'Sign up', state: '/sessions/signup', type: 'link' },
                { icon: 'i-Checked-User', name: 'Sign in', state: '/sessions/signin', type: 'link' },
                { icon: 'i-Find-User', name: 'Forgot', state: '/sessions/forgot', type: 'link' }
            ]
        },
        {
            name: 'Pages',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            type: 'dropDown',
            icon: 'i-Windows-2',
            sub: [
                { icon: 'i-Male', name: 'User Profile', state: '/pages/profile', type: 'link' }
            ]
        },
        {
            name: 'Icons',
            description: '600+ premium icons',
            type: 'link',
            icon: 'i-Cloud-Sun',
            state: '/icons/iconsmind'
        },
        {
            name: 'Others',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            type: 'dropDown',
            icon: 'i-Double-Tap',
            sub: [
                { icon: 'i-Error-404-Window', name: 'Not found', state: '/others/404', type: 'link' }
            ]
        },
        {
            name: 'Doc',
            type: 'extLink',
            tooltip: 'Documentation',
            icon: 'i-Safe-Box1',
            state: 'http://demos.ui-lib.com/gull-doc'
        }
    ];


    // sets iconMenu as default;
    menuItems = new BehaviorSubject<IMenuItem[]>(this.defaultMenu);
    // navigation component has subscribed to this Observable
    menuItems$ = this.menuItems.asObservable();

    // You can customize this method to supply different menu for
    // different user type.
    // publishNavigationChange(menuType: string) {
    //   switch (userType) {
    //     case 'admin':
    //       this.menuItems.next(this.adminMenu);
    //       break;
    //     case 'user':
    //       this.menuItems.next(this.userMenu);
    //       break;
    //     default:
    //       this.menuItems.next(this.defaultMenu);
    //   }
    // }
}
