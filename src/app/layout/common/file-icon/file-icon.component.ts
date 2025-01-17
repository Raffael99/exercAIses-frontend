import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatFabButton } from '@angular/material/button';
import { FileService } from '../../../core/file/file.service';

@Component({
    selector: 'file-icon',
    standalone: true,
    imports: [MatIcon, NgIf, MatFabButton],
    templateUrl: './file-icon.component.html',
})
export class FileIconComponent {
    constructor(private _fileService: FileService) {}

    @Input() file: File;

    removeFile(file: File): void {
        this._fileService.removeFile(file);
    }
}
