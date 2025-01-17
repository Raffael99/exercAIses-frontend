import { ChangeDetectorRef, Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FileIconComponent } from '../file-icon/file-icon.component';
import { FileService } from '../../../core/file/file.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'file-input',
    standalone: true,
    imports: [NgClass, NgIf, NgForOf, FileIconComponent],
    templateUrl: './file-input.component.html',
})
export class FileInputComponent implements OnInit, OnDestroy {

    constructor(private _fileService: FileService,
                private _changeDetectorRef: ChangeDetectorRef) {}

    @Input() limit: number = 1;

    error: string;
    dragAreaClass: string = 'dragarea';
    draggedFiles: File[] = [];

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    ngOnInit(): void {
        this.dragAreaClass = 'dragarea';
        // Subscribe to user changes
        this._fileService.getFile$()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((files: File[]) => {
                this.draggedFiles = files;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    onFileChange(event: any) {
        let files: FileList = event.target.files;
        this.saveFiles(files);
    }
    @HostListener('dragover', ['$event']) onDragOver(event: any) {
        this.dragAreaClass = 'droparea';
        event.preventDefault();
    }
    @HostListener('dragenter', ['$event']) onDragEnter(event: any) {
        this.dragAreaClass = 'droparea';
        event.preventDefault();
    }
    @HostListener('dragend', ['$event']) onDragEnd(event: any) {
        this.dragAreaClass = 'dragarea';
        event.preventDefault();
    }
    @HostListener('dragleave', ['$event']) onDragLeave(event: any) {
        this.dragAreaClass = 'dragarea';
        event.preventDefault();
    }
    @HostListener('drop', ['$event']) onDrop(event: any) {
        this.dragAreaClass = 'dragarea';
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer.files) {
            let files: FileList = event.dataTransfer.files;
            this.saveFiles(files);
        }
    }

    saveFiles(files: FileList) {
        if (files.length + this.draggedFiles.length > this.limit) {
            this.error = 'Only ' + this.limit+ ' file' + (this.limit == 1 ? ' is' : 's are') + ' allowed.';
            return;
        } else {
            this.error = '';
            this._fileService.addFiles(files);
        }
    }
}
