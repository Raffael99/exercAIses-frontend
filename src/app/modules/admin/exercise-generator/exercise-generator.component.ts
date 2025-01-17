import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton, MatFabButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FileInputComponent } from '../../../layout/common/file-input/file-input.component';
import { FileService } from '../../../core/file/file.service';
import { Subject, takeUntil } from 'rxjs';
import { NgForOf, NgIf } from '@angular/common';

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
        MatButton,
        NgIf,
        NgForOf,
    ],
})
export class ExerciseGeneratorComponent implements OnInit, OnDestroy {
    @ViewChild('supportNgForm') supportNgForm: NgForm;
    generateForm: FormGroup;

    files: File[] = [];
    results: string[] = [];
    answerAvailable: boolean = false;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _fileService: FileService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {}

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
        });

        this._fileService
            .getFile$()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((files: File[]) => {
                this.files = files;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        this._fileService
            .getResults$()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((results: string) => {
                results.split('\n').forEach((result) => {
                    this.results.push(result);
                })
                this.answerAvailable = results.length > 0;
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
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

    generateExercise() {
        this._fileService.sendFileContent();
    }
}
