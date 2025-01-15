import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
    selector: 'file-icon',
    standalone: true,
    imports: [MatIcon, NgIf],
    templateUrl: './file-icon.component.html',
})
export class FileIconComponent {
    constructor() {}

    @Input() file: File;
}
