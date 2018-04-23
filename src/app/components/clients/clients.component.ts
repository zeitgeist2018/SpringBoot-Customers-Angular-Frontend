import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';
import swal from 'sweetalert2';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {

  clients: Client[];

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getClients()
      .subscribe(clients => {
        this.clients = clients;
      });
  }

  delete(client: Client): void {
    swal({
      title: 'Delete client',
      text: `Are you sure you want to delete the client ${client.name}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete client'
    }).then((result) => {
      if (result.value) {
        this.clientService.delete(client.id).subscribe(res => {
          this.clients = this.clients.filter(c => c !== client);
          swal(
            'Deleted',
            `The client ${client.name} has been deleted.`,
            'success'
          );
        });
      }
    });
  }
}
