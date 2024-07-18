import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from '../../service/admin-service.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent {

  bookId!: number;
  bookForm!: FormGroup;

  constructor(
    private adminService: AdminServiceService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private router: Router,
  ){}

  ngOnInit() :void{
    this.route.params.subscribe(params => {
      this.bookId = params['id'];
      this.loadContent(this.bookId); // Call method to load content details
    });

    // Initialize contentForm with form controls
    this.bookForm = this.formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', Validators.required],
      publicationDate: ['', Validators.required],
    });
  }

  loadContent(bookId: number) {
    this.adminService.getOneBook(bookId)
      .subscribe(
        (response) => {
          // Populate form controls with fetched content data
          this.bookForm.patchValue({
            id: response.id,
            title: response.title,
            description: response.description,
            author: response.author,
            isbn : response.isbn,
            publicationDate: response.publicationDate
          });
        },
        (error) => {
          console.error('Failed to fetch course', error);
        }
      );
  }


  updateBook() {
    if (this.bookForm.valid) {
      const updates = {
        id: this.bookForm.get('id')?.value,
        title: this.bookForm.get('title')?.value,
        description: this.bookForm.get('description')?.value,
        author: this.bookForm.get('author')?.value,
        isbn: this.bookForm.get('isbn')?.value,
        publicationDate: this.bookForm.get('publicationDate')?.value,
      };

      this.adminService.updateBook(this.bookId, updates)
        .subscribe(
          (res) => {
            if (res.id != null) {
              this.snackBar.open('Book updated Successfully', 'Close', {
                duration: 5000
              });
              this.router.navigateByUrl('/admin/allBooks');
            } else {
              this.snackBar.open(res.message, 'ERROR', {
                duration: 5000
              });
            }
          },
          (error) => {
            console.error('Failed to update course', error);
            this.snackBar.open('Failed to update course', 'ERROR', {
              duration: 5000
            });
          }
        );
    } else {
      // If form is invalid, mark all fields as dirty to display validation errors
      Object.values(this.bookForm.controls).forEach(control => {
        control.markAsDirty();
      });
    }
  }

}
