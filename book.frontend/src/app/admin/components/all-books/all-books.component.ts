import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from '../../service/admin-service.service';


@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent {

  contents: any[] = [];

  constructor(private route: ActivatedRoute, private adminService: AdminServiceService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllBooks();

  }


  getAllBooks(){
    this.adminService.getAllBooks().subscribe(res => {
      this.contents = res;
    })
  }

  deleteBook(bookId: number) {
    this.adminService.deleteBook(bookId).subscribe(() => {
      this.snackBar.open('Content deleted Successfully', 'Close', {
        duration: 5000
      });
    }, error => {
      // Handle error
      console.error('Error deleting content:', error);
    });
  }

  redirectToUpdatePage(courseId: number) {
    this.router.navigate([`/leaner/courses/`, courseId]);
  }

}
