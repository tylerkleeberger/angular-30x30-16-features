import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { MessagesService } from 'src/app/messages.service';
import { Contact } from '../contacts/contact';
import { ContactsService } from '../contacts/contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit{

  contacts$!: Observable<Contact[]>
  selectedId = 0;

  constructor(
    private contactService: ContactsService,
    private route: ActivatedRoute,
    private messageService: MessagesService
  ) { }

  ngOnInit(): void {
    this.contacts$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = parseInt(params.get('id')!, 10);
        return this.contactService.getContacts();
      })
    )
  }

  // selectedContact?: Contact;
  // contacts: Contact[] = [];

  // onSelect(contact: Contact): void {
  //   this.selectedContact = contact;
  //   this.messageService.add(`ContactsComponent: Selected contact id=${contact.id}`);
  // }

  // getContacts(): void {
  //   this.contactService.getContacts()
  //       .subscribe(contacts => this.contacts = contacts);
  // }
}
