import { Component, HostListener, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FileIconComponent } from '../file-icon/file-icon.component';

@Component({
    selector: 'file-input',
    standalone: true,
    imports: [NgClass, NgIf, NgForOf, FileIconComponent],
    templateUrl: './file-input.component.html',
})
export class FileInputComponent implements OnInit {
    error: string;
    dragAreaClass: string = 'dragarea';
    draggedFiles: File[] = [];

    onFileChange(event: any) {
        let files: FileList = event.target.files;
        this.saveFiles(files);
    }
    ngOnInit() {
        this.dragAreaClass = 'dragarea';
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
        this.error = '';
        console.log(files[0].size, files[0].name, files[0].type);
        for (let i = 0; i < files.length; i++) {
            this.draggedFiles.push(files[i]);
        }

    }
}
