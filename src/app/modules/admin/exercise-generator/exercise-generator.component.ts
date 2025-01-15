import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatFabButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FileInputComponent } from '../../../layout/common/file-input/file-input.component';

@Component({
    selector: 'exercise-generator',
    standalone: true,
    templateUrl: './exercise-generator.component.html',
    styles: [
        `
            .dragarea {
                font-size: 1.5rem;
                border: 3px solid #bbb;
                padding: 1.5rem;
                background-color: #fff;
                color: #bbb;
            }

            .droparea {
                font-size: 1.5rem;
                border: 3px dashed #bbb;
                padding: 1.5rem;
                background-color: #eff;
                color: #aaa;
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        MatLabel,
        MatIcon,
        MatFabButton,
        FileInputComponent,
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
            numExercises: [5, [Validators.required]],
            subject: ['', Validators.required],
            message: ['', Validators.required],
        });
    }

    increaseNumExercises(): void {
        const currentValue: number =
            this.generateForm.get('numExercises')?.value || 0;
        this.generateForm.get('numExercises')?.setValue(currentValue + 1);
    }

    decreaseNumExercises(): void {
        const currentValue: number =
            this.generateForm.get('numExercises')?.value || 0;
        this.generateForm.get('numExercises')?.setValue(currentValue - 1);
    }
}
