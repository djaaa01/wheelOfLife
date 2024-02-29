import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  setDoc,
  query,
  where,
  docData,
  deleteDoc,
  WhereFilterOp,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { FirestoreCollections } from '../enums/firestore-colections.enum';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  async addCollectionData<T>(
    collectionName: FirestoreCollections,
    data: any
  ): Promise<T> {
    const collectionRef = collection(this.firestore, collectionName);
    const dataRef = await addDoc(collectionRef, { ...data });
    return dataRef as T;
  }

  getCollention<T>(
    collectionName: string,
    field: string,
    condition: WhereFilterOp,
    value: string
  ): Observable<T[]> {
    const q = query(
      collection(this.firestore, collectionName),
      where(field, condition, value)
    );
    const getColectionData = collectionData(q, { idField: 'id' });

    return getColectionData as Observable<T[]>;
  }
}
