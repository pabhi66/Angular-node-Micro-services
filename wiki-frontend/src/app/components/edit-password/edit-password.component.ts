import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Location } from '@angular/common';
import { User } from '../../models/user';
import { ActivatedRoute, ParamMap } from '@angular/router';


import { Store } from '@ngrx/store';
import { IStore } from '../../state/interfaces/store.interface';
import { IUser } from '../../state/interfaces/user.interface';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';


@Component({
    selector: 'app-edit-password',
    templateUrl: './edit-password.component.html',
    styleUrls: ['./edit-password.component.css']
})

export class EditPasswordComponent implements OnInit {


    constructor(private router: Router,
                private userService: UserService,
                private location: Location,
                private route: ActivatedRoute
            ) { }

    ngOnInit() {

    }

    onSubmit(form: NgForm) {
        const info = form.value;
        console.log(info);

        this.userService.updatePassword(info).subscribe();
    }
}


