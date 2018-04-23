import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private title = 'Create client';
  private client: Client = new Client();

  constructor(private clientService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadClient();
  }

  public loadClient(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.clientService.getClient(id).subscribe(client => {
          this.client = client;
        });
      }
    });
  }

  public create(): void {
    this.clientService.create(this.client).subscribe(client => {
      this.router.navigate(['/clients']);
      swal(
        'Client created',
        `Client <strong>${client.name}</strong> created successfully`,
        'success'
      );
    });
  }

  public update(): void {
    this.clientService.update(this.client).subscribe(client => {
      this.router.navigate(['/clients']);
      swal(
        'Client updated',
        `Client <strong>${client.name}</strong> updated successfully`,
        'success'
      );
    });
  }
}
