import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ACCESSIBILITY } from './accessibility';

import { ServicesService } from '@services/services.service';


@Component({
    selector: ".m-wrapper",
    templateUrl: "./permissions.component.html",
    encapsulation: ViewEncapsulation.None
})

export class PermissionsComponent implements OnInit {

    permission = [];
    default;
    accessibility;

    selected;

    constructor(
        private _services: ServicesService) { }

    ngOnInit() {
        this.default = JSON.parse(JSON.stringify(ACCESSIBILITY));
        this.accessibility = JSON.parse(JSON.stringify(ACCESSIBILITY));

        this.setPermission(0);
    }

    setPermission(i) {
        this.permission = [];
        this.permission = this.accessibility[i].subpage;
        this.selected = this.accessibility[i];
    }

    selectAll() {
        for (let x of this.permission) {
            x['enabled'] = true;
        }
        this.selected.enabled = true;
    }

    unselectAll() {
        for (let x of this.permission) {
            delete x['enabled'];
        }
        this.selected.enabled = false;
    }
    
    onSubmit() {
        let accessibility = this.buildAccessibility();
        console.log(accessibility)
    }

    buildAccessibility() {
        let clone = JSON.parse(JSON.stringify(this.accessibility));
        clone[0]['subpage'] = [];

        for (let a = 0; a < clone.length; a++) {
            let isSub = false;
            for (let b = 0; b < clone[a].subpage.length; b++) {
                if (clone[a].subpage[b].enabled) {
                    isSub = true;
                    break;
                }
            }

            if(isSub) {
                clone[a]['enabled'] = true;
            } else {
                if(clone[a].subpage.length) {
                    clone[a]['enabled'] = false;
                }
            }
        }

        let x = [];
        let i = 0;
        let cloneDefault = JSON.parse(JSON.stringify(this.default));
        for(let d of cloneDefault) {
            let f = clone.find(a => (a.path === d.path) && d.icon && (!d['found']));
            if(f) {
                d['found'] = true;
                x.push(f);

                if(!f.enabled) {
                    if(!x[i - 1].path && !x[i - 1].icon) {
                        x[i - 1].enabled = false;
                    }
                }
                
            } else {
                if(!d['found']) {
                    x.push(d);
                }
            }
            i++
        }

        return x;
    }


    // #### ##     ## ########   #######  ########  ########    ###    ##    ## ######## 
    //  ##  ###   ### ##     ## ##     ## ##     ##    ##      ## ##   ###   ##    ##    
    //  ##  #### #### ##     ## ##     ## ##     ##    ##     ##   ##  ####  ##    ##    
    //  ##  ## ### ## ########  ##     ## ########     ##    ##     ## ## ## ##    ##    
    //  ##  ##     ## ##        ##     ## ##   ##      ##    ######### ##  ####    ##    
    //  ##  ##     ## ##        ##     ## ##    ##     ##    ##     ## ##   ###    ##    
    // #### ##     ## ##         #######  ##     ##    ##    ##     ## ##    ##    ##

    getOneAccount() {
        let response: any; // refer to response from API 
        let a = JSON.parse(JSON.stringify(response.data.accessibility));
        if(a && a.length) {
            // to check against the first layer first
            let checker = [];
            for (let d of this.default) {
                let found = null;
                for (let current of a) {
                    if ((d.title === current.title) && (d.path === current.path)) {
                        found = current;
                        break;
                    }
                }
                if (found) {
                    checker.push(found);
                } else {
                    checker.push(d);
                }
            }
            a = checker;
            // check second layer
            let i = a.length - 1;
            do {
                if (!a[i].path) {
                    a.splice(i, 1)
                }

                // to check with created list and default list
                // if not found, add to the list
                for (let m of this.default) {
                    if (m.path === a[i].path) {
                        if(m.subpage && m.subpage.length && a[i].subpage && a[i].subpage.length) {
                            for (let b of m.subpage) {
                                let found = a[i].subpage.find(d => d.path === b.path);
                                if (!found || found === undefined) {
                                    b.enabled = false;
                                    a[i].subpage.push(b);
                                }
                            }
                        }
                    }
                }

                i--;
            }
            while (i > -1);
            this.accessibility = a;
        } else {
            this.default = JSON.parse(JSON.stringify(this.accessibility));
        }
        this.setPermission(0);
    }

}