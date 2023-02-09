import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Contact } from '../contacts/contact';
import { ContactsService } from '../contacts/contacts.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit{

  contact$!: Observable<Contact>

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.contact$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => 
      this.contactService.getContact(params.get('id')!))
    );
  }


  //BACK NAVIGATION//
  gotoContacts(contact: Contact) {
    const contactId = contact ? contact.id : null;
    this.router.navigate(['/contacts', {id: contactId}]);
  }


  ////////ROUTE PARAM ALTERNATIVE
  // getContact(): void{
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   this.contactService.getContact(id).subscribe(contact => this.contact = contact);
  // }

  //**Save */
  // save(): void {
  //   if (this.contact) {
  //     this.contactService.updateContact(this.contact)
  //       .subscribe(() => this.goBack());
  //   }
  // }

}
