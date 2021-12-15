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
            ]
        },
        {
            name: 'Livraison',
            description: 'Gestion des livraisons',
            type: 'dropDown',
            icon: 'i-Shopping-Basket',
            sub: [
                { icon: 'i-Checkout-Basket', name: 'Assigner livreur à une facture', state: '/livraison/add', type: 'link' },
                { icon: 'i-Full-Basket', name: 'Lister les livraison', state: '/livraison/list', type: 'link' },
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
