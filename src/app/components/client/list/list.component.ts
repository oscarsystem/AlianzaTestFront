import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { ClientService } from '../service/client/client.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  clientsList: any = [];
  displayedColumns: string[] = ['sharedKey', 'names', 'phone', 'email', 'dateAdd', 'action'];
  isLoading = true;
  sharedKey: string = "";
  advanceSearch: boolean = false;

  constructor(private clientService: ClientService,
    private dialog: MatDialog){

  }

  ngOnInit(){
    this.listClients();    
  }

  listClients(): void{
    this.clientService.getAllClients().subscribe(
      res => {
        this.clientsList = res;
        this.isLoading = false;
      },
      err => console.log(err)
    );
  }

  openDialog(){
    let dialogRef = this.dialog.open(AddComponent);
    dialogRef.afterClosed().subscribe({
      next: () => {
        this.listClients();
      }
    })
  }

  findClientBySharedKey(){
    this.clientService.findClientBySharedKey(this.sharedKey).subscribe(
      res => {
        this.clientsList = res;
        this.isLoading = false;
      },
      err => console.log(err)
    );
  }

  exportClients(){
    const csvData = this.convertToCsv(this.clientsList);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'clients.csv');
  }

  private convertToCsv(data: any[]): string {
    console.log(this.clientsList);
    let csv = '';

  const headers = Object.keys(data[0]);
  csv += headers.join(',') + '\n';

  data.forEach(item => {
    const row = headers.map(header => {
      const value = item[header];
      return value !== undefined ? value : ''; // if is undefined, use empty
    }).join(',');
    csv += row + '\n';
  });

  return csv;
  }

  openComponentAdvanceSearch(){
    this.advanceSearch = true;
  }

}
