import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, DocumentReference, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreatelaService {

  constructor(private firestore: Firestore) {}

  getCollectionData(collectionName: string): Observable<any[]> {
    return collectionData(collection(this.firestore, collectionName), { idField: 'id' });
  }

  moveItemToTable(source: string, destination: string, item: any): Promise<void> {
    const sourceDocRef = doc(this.firestore, `${source}/${item.id}`);
    return this.deleteDocument(source, item.id) // Delete from source
      .then(() => this.addDocument(destination, item)) // Add to destination
      .then(() => undefined); // Ensure the final return type is Promise<void>
  }

  copyItemToTable(source: string, destination: string, item: any): Promise<void> {
    const sourceDocRef = doc(this.firestore, `${source}/${item.id}`);
    return this.addDocument(destination, item) // Add to destination
      .then(() => undefined); // Ensure the final return type is Promise<void>
  }
  

  addDocument(collectionName: string, data: object): Promise<DocumentReference<DocumentData>> {
    return addDoc(collection(this.firestore, collectionName), data);
  }

  deleteDocument(collectionName: string, id: string): Promise<void> {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    return deleteDoc(docRef);
  }
}
