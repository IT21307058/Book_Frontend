import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminServiceService } from '../../service/admin-service.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {

  bookForm!: FormGroup;

  constructor(
    private fb:FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminServiceService
  ){}

  ngOnInit() :void{
    this.bookForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      author: [null, [Validators.required]],
      isbn: [null, [Validators.required]],
      publicationDate: [null, [Validators.required]],
    })
  }

  addBook(): void{
    if(this.bookForm.valid){
      this.adminService.addBook(this.bookForm.value).subscribe((res) => {
        if(res.id != null){
          this.snackBar.open('Book Created Successfully', 'Close', {
            duration: 5000
          });
          this.router.navigateByUrl('/admin/allBooks');
        }else{
          this.snackBar.open(res.message, 'Close', {
            duration: 5000,
            panelClass: 'error-snackbar'
          })
        }
      })
    }else{
      this.bookForm.markAllAsTouched();
    }
  }

}
