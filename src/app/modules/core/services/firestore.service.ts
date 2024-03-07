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
  deleteDoc,
  WhereFilterOp,
  getDoc,
  getDocs,
  deleteField,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
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

  async deleteDocumentById(
    collectionName: FirestoreCollections,
    docId: string
  ): Promise<void> {
    const docRef = doc(this.firestore, `${collectionName}/${docId}`);
    await deleteDoc(docRef);
  }

  async getDocumentById<T>(
    collectionName: FirestoreCollections,
    docId: string
  ): Promise<T> {
    const docRef = doc(this.firestore, `${collectionName}/${docId}`);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as T;
  }

  update(collectionName: FirestoreCollections, data: any): Promise<void> {
    const collectionRef = doc(this.firestore, `${collectionName}/${data.id}`);
    return setDoc(collectionRef, Object.assign({}, data));
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
