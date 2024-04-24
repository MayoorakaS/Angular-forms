import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";
import { ContactFilterPipe } from '../contact-filter.pipe'

@Component({
  selector: 'app-contact-forms',
  templateUrl: './contact-forms.component.html',
  styleUrl: './contact-forms.component.css',
  providers: [ContactFilterPipe]
})
export class ContactFormsComponent implements OnInit {
  contactForms: FormGroup;
  contacts: any = [];
  filteredContacts: any = [];
  searchNameFilter :string ='';
  searchGenderFilter:string ='';

  constructor() {
    this.contactForms = new FormGroup({
      name: new FormControl(''),
      gender: new FormControl(''),
      age: new FormControl(''),
      date: new FormControl(''),
      searchName: new FormControl(''),
      searchGender: new FormControl('')
    });
  }

  ngOnInit() {
   // this.filteredContacts =this.contacts;
    this.contacts = [
      { name: 'John Doe', age: 30, gender: 'male', date: '2024-04-25' },
      { name: 'Jane Smith', age: 25, gender: 'female', date: '2024-04-26' },

    ];
    this.applyFilters();
  }

  onSubmit() {
    console.log(`"onSubmit before" ${this.filteredContacts}`)
    const formData = this.contactForms.value;

    const newContact: any = {
      name: formData.name,
      age: formData.age,
      gender: formData.gender,
      date: formData.date
    }
    this.contacts.push(newContact);
    this.applyFilters();
    console.log(`"onSubmit after" ${this.filteredContacts}`)
    this.contactForms.reset();
  }

  applyFilters() {
    const searchNameControl = this.contactForms.get('searchName');
    const searchGenderControl = this.contactForms.get('searchGender');

    if (searchNameControl && searchGenderControl) {
      const searchName = searchNameControl.value.toLowerCase();
      const searchGender = searchGenderControl.value.toLowerCase();

      this.filteredContacts = this.contacts.filter((contact:any) => {
        const nameMatch = !searchName || contact.name.toLowerCase().includes(searchName);
        const genderMatch = !searchGender || contact.gender.toLowerCase() === searchGender;
        return nameMatch && genderMatch;
      });
    }
  }

  // onSearchName(searchName: string): void {
  //   console.log(`"onSearchName before " ${this.filteredContacts}`);
  //   this.searchNameFilter = searchName;
  //   this.filteredContacts = this.contacts.filter((contact:any) =>
  //     contact.name.toLowerCase().includes( this.searchNameFilter.toLowerCase())
  //   );
  //   console.log(`"onSearchName after" ${this.filteredContacts}`);
  // }
  // onSearchGender(searchGender: string): void {
  //   console.log(`"onSearchGender before" ${this.filteredContacts}`);
  //   this.searchGenderFilter =searchGender;
  //   if (this.searchGenderFilter === '' &&  this.searchNameFilter ==='') {
  //     this.filteredContacts = this.contacts;
  //   }
  //   else if (this.searchGenderFilter !== '' &&  this.searchNameFilter === ''){
  //     this.filteredContacts = this.contacts.filter((contact:any) =>
  //       contact.gender.toLowerCase() === this.searchGenderFilter.toLowerCase()
  //     );
  //   }else {
  //     this.filteredContacts = this.contacts.filter((contact:any) =>
  //       contact.gender.toLowerCase() === this.searchGenderFilter.toLowerCase() && contact.name.toLowerCase().includes( this.searchNameFilter.toLowerCase())
  //     );
  //   }
  //   console.log(`"onSearchGender after" ${this.filteredContacts}`);
  // }

}
