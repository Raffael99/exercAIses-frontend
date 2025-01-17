import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root',
})
export class FileService {
    constructor(private http: HttpClient) {
        this._files.next(this.files);
    }

    private BACKEND_URL = 'https://exercaise-minimal-instance.agreeablehill-460d04f2.westeurope.azurecontainerapps.io';

    private _files: ReplaySubject<File[]> = new ReplaySubject<File[]>(1);
    private files: File[] = []; // Internal state for file list

    private _results: ReplaySubject<string> = new ReplaySubject<string>(1);

    // Observable for the list of files
    getFile$() {
        return this._files.asObservable();
    }

    getResults$(): Observable<string> {
        return this._results.asObservable();
    }

    // Add a single file
    addFile(file: File): void {
        this.files.push(file);
        this._files.next([...this.files]); // Emit updated list
    }

    // Add multiple files
    addFiles(files: FileList): void {
        for (let i = 0; i < files.length; i++) {
            this.files.push(files[i]);
        }
        this._files.next([...this.files]); // Emit updated list
    }

    // Remove a specific file
    removeFile(file: File): void {
        this.files = this.files.filter((f) => f !== file);
        this._files.next([...this.files]); // Emit updated list
    }

    sendFileContent(): void {
        const file = this.files[0];

        const processingCommand = "please give 5 example questions to the topic of the following content";

        // Create FormData object for multipart/form-data
        const formData = new FormData();
        formData.append('file', file); // Attach the file

        // Send the POST request
        this.http.post(`${this.BACKEND_URL}/evaluator?aspects=${processingCommand}`, formData).subscribe({
            next: (response) => {
                console.log('Response:', response);
                this._results.next(response.toString());
            },
            error: (err) => {
                console.error('Error sending file content', err);
                this._results.error(err);
            },
        });
    }
}
