import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from '../../service/admin-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent {

  contents: any[] = [];
  totalBooks: number = 0;
  pageSize: number = 5;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private route: ActivatedRoute, private adminService: AdminServiceService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllBooks();

  }

  getAllBooks(){
    this.adminService.getAllBooks(this.currentPage, this.pageSize).subscribe(res => {
      this.contents = res.books;
      this.totalBooks = res.totalBooks;
      this.totalPages = res.totalPages;
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

  redirectToUpdatePage(bookId: number) {
    this.router.navigate([`/admin/updateBook/`, bookId]);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getAllBooks();
    }
  }

}
