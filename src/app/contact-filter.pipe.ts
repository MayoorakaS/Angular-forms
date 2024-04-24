import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contactFilter'
})
export class ContactFilterPipe implements PipeTransform {
  transform(contacts: any[], searchName: string, searchGender: string): any[] {
    if (!contacts) return [];

    return contacts.filter(contact => {
      const nameMatch = !searchName || contact.name.toLowerCase().includes(searchName.toLowerCase());
      const genderMatch = !searchGender || contact.gender.toLowerCase() === searchGender.toLowerCase();
      return nameMatch && genderMatch;
    });
  }
}
