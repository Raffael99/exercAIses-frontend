import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatFabButton } from '@angular/material/button';

@Component({
    selector: 'file-icon',
    standalone: true,
    imports: [MatIcon, NgIf, MatFabButton],
    templateUrl: './file-icon.component.html',
})
export class FileIconComponent {
    constructor() {}

    @Input() file: File;

    removeFile(file: File): string {
        return 'remove';
    }
}
