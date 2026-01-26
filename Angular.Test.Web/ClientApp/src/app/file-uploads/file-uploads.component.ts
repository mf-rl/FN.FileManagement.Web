import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse, } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';
interface UploadResult { }
@Component({
  selector: 'app-file-uploads',
  templateUrl: './file-uploads.component.html',
  standalone: true,
  imports: [CommonModule, NgbProgressbarModule]
})
export class FileUploadsComponent implements OnInit {
  private apiBaseUrl = environment.apiBaseUrl;
  public fileUploads: FileUploads[] = [];
  selectedFile: File | null = null;
  errorMsg = '';
  uploadProgress = 0;
  uploading = false;
  uploadResult: UploadResult | undefined;
  serviceStatus: 'checking' | 'connected' | 'disconnected' = 'checking';
  serviceErrorMessage = '';
  constructor(private http: HttpClient) {
  }
  ngOnInit() {
    this.checkServiceConnection();
  }
  
  checkServiceConnection() {
    this.serviceStatus = 'checking';
    this.http.get<FileUploads[]>(`${this.apiBaseUrl}Uploads`).subscribe({
      next: (result) => {
        this.serviceStatus = 'connected';
        this.fileUploads = result;
        this.serviceErrorMessage = '';
      },
      error: (error) => {
        this.serviceStatus = 'disconnected';
        if (error.status === 0) {
          this.serviceErrorMessage = 'Unable to connect to the file management service. Please ensure the service is running at ' + this.apiBaseUrl;
        } else {
          this.serviceErrorMessage = `Error connecting to service: ${error.status} - ${error.statusText}`;
        }
        console.error('Service connection error:', error);
      }
    });
  }
  downloadFile(id: number) {
    const url = `${this.apiBaseUrl}Uploads/download/${id}`;
    window.open(url, '_blank');
  }
  deleteFile(id: number) {
    if (confirm("Delete file?")) {
      const req = new HttpRequest(
        'DELETE',
        `${this.apiBaseUrl}Uploads/${id}`,
        null,
        {
          reportProgress: true,
        }
      );
      this.http
        .request(req)
        .pipe(
          finalize(() => {
            this.uploading = false;
            this.LoadData();
          })
        )
        .subscribe(
          (event) => {
            if (event.type === HttpEventType.UploadProgress && event.total) {
              this.uploadProgress = Math.round(
                (100 * event.loaded) / event.total
              );
            }
          },
          (error) => {
            throw error;
          }
        );
    }    
  }
  LoadData() {
    if (this.serviceStatus === 'disconnected') {
      this.checkServiceConnection();
      return;
    }
    this.http.get<FileUploads[]>(`${this.apiBaseUrl}Uploads`).subscribe({
      next: (result) => {
        this.fileUploads = result;
      },
      error: (error) => {
        this.serviceStatus = 'disconnected';
        this.serviceErrorMessage = 'Failed to load uploads. Service may be unavailable.';
        console.error(error);
      }
    });
  }
  chooseFile(files: FileList | null) {
    this.selectedFile = null;
    this.errorMsg = '';
    this.uploadProgress = 0;
    if (!files || files.length === 0) {
      return;
    }
    this.selectedFile = files[0];
  }
  humanFileSize(bytes: number): string {
    if (Math.abs(bytes) < 1024) {
      return bytes + ' B';
    }
    const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let u = -1;
    do {
      bytes /= 1024;
      u++;
    } while (Math.abs(bytes) >= 1024 && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
  }
  upload() {
    if (!this.selectedFile) {
      this.errorMsg = 'Please choose a file.';
      return;
    }

    const formData = new FormData();
    formData.append('File', this.selectedFile);

    const req = new HttpRequest(
      'POST',
      `${this.apiBaseUrl}Uploads`,
      formData,
      {
        reportProgress: true,
      }
    );
    this.uploading = true;
    this.http
      .request<UploadResult>(req)
      .pipe(
        finalize(() => {
          this.uploading = false;
          this.selectedFile = null;
          this.LoadData();
        })
      )
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.uploadProgress = Math.round(
              (100 * event.loaded) / event.total
            );
          } else if (event instanceof HttpResponse) {
            this.uploadResult = event.body ?? undefined;
          }
        },
        (error) => {
          throw error; 
        }
      );
  }
}

interface FileUploads {
  id: number;
  fileName: string;
  uploadDate: string;
  extension: string;
}
