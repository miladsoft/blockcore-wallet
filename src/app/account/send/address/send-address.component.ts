import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SendService } from '../../../services/send.service';

@Component({
    selector: 'app-account-send-address',
    templateUrl: './send-address.component.html'
})
export class AccountSendAddressComponent implements OnInit, OnDestroy {

    // addressInput = new FormControl('', [Validators.required, Validators.email]);
    // amountInput = new FormControl('', [Validators.required, Validators.email]);
    // feeInput = new FormControl('', [Validators.required, Validators.email]);

    // form: FormGroup = new FormGroup({
    //     addressInput: new FormControl('', [Validators.required, Validators.email]),
    //     amountInput: new FormControl('', [Validators.required]),
    //     feeInput: new FormControl('', [Validators.required])
    // });

    // parts: FormGroup;

    form: FormGroup;

    // hideRequiredControl = new FormControl(false);
    // floatLabelControl = new FormControl('auto');

    constructor(public sendService: SendService, private fb: FormBuilder) {

        this.form = fb.group({
            addressInput: new FormControl('', [Validators.required, Validators.minLength(6)]),
            amountInput: new FormControl('', [Validators.required]),
            feeInput: new FormControl('', [Validators.required])
        });

        // this.parts = fb.group({
        //     area: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
        //     exchange: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
        //     subscriber: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
        // });
    }

    // get firstFormGroupControls() {
    //     return this.form.get('firstFormGroup')['controls'];
    // }

    ngOnDestroy() {

    }

    async ngOnInit() {
    }

    getErrorMessage() {
        if (this.form.get('addressInput').hasError('required')) {
            return 'You must enter a value';
        }

        return this.form.get('addressInput').hasError('email') ? 'Not a valid email' : '';
    }
}