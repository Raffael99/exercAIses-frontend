import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class FileService {
    constructor(private http: HttpClient) {}

    private BACKEND_URL = 'https://exercaise-minimal-instance.agreeablehill-460d04f2.westeurope.azurecontainerapps.io/generator';

    private files: File[] = [];

    addFile(file: File): void {
        this.files.push(file);
    }

    removeFile(file: File): void {
        this.files = this.files.filter((f) => f !== file);
    }

    getFiles(): File[] {
        return this.files;
    }

    // Send files to the backend
    uploadFiles(): Observable<any> {
        const file = this.files[0];
        if (file) {
            return new Observable(observer => {
                const reader = new FileReader();

                // Read file as text
                reader.onload = () => {
                    const fileContent = reader.result as string;
                    this.sendFileContent(fileContent).subscribe({
                        next: response => {
                            observer.next(response);
                            observer.complete();
                        },
                        error: err => observer.error(err),
                    });
                };

                reader.onerror = () => {
                    observer.error('Error reading file');
                };

                reader.readAsText(file);
            });
        } else {
            throw new Error('No file to upload');
        }
    }

    sendFileContent(fileContent: string): Observable<any> {
        const processingCommand = "please give 5 example quesions to the topic of the following content:\n"
        return this.http.post(`${this.BACKEND_URL}?text=${processingCommand}${fileContent}`, {});
    }
}
