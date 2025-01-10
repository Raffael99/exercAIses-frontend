import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatFabButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'exercise-generator',
    standalone: true,
    templateUrl: './exercise-generator.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        MatLabel,
        MatMiniFabButton,
        MatIcon,
        MatFabButton,
    ],
})
export class ExerciseGeneratorComponent {
    @ViewChild('supportNgForm') supportNgForm: NgForm;
    generateForm: FormGroup;
    /**
     * Constructor
     */
    constructor(private _formBuilder: FormBuilder) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the exercise form
        this.generateForm = this._formBuilder.group({
            name: ['', Validators.required],
            numExercises: [5, [Validators.required, Validators.email]],
            subject: ['', Validators.required],
            message: ['', Validators.required],
        });
    }

    increaseNumExercises(): void {
        this.generateForm.value.numExercises++;
    }
    decreaseNumExercises(): void {
        this.generateForm.value.numExercises--;
    }
}
