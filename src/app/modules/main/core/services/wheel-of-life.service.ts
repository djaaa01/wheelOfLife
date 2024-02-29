import { Injectable } from '@angular/core';
import {
  WheelOfLife,
  WheelOfLifeResponse,
  WheelOfLifeSegment,
} from '../models/wheel-of-life.model';
import { FirestoreService } from 'src/app/modules/core/services/firestore.service';
import { FirestoreCollections } from 'src/app/modules/core/enums/firestore-colections.enum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WheelOfLifeService {
  constructor(private readonly firestoreService: FirestoreService) {}

  getWheelOfLife(uid: string): Observable<WheelOfLife[]> {
    return this.firestoreService.getCollention<WheelOfLife>(
      FirestoreCollections.wheelOfLife,
      'uid',
      '==',
      uid
    );
  }

  getSegments(wheelOfLifeId: string): Observable<WheelOfLifeSegment[]> {
    return this.firestoreService.getCollention<WheelOfLifeSegment>(
      FirestoreCollections.wheelOfLifeSegments,
      'wheelOfLifeId',
      '==',
      wheelOfLifeId
    );
  }

  createWheelOfLife(
    wheelOfLifeData?: WheelOfLife
  ): Promise<WheelOfLifeResponse> {
    return this.firestoreService.addCollectionData<WheelOfLifeResponse>(
      FirestoreCollections.wheelOfLife,
      wheelOfLifeData
    );
  }

  addWheelOfLifeSegment(wheelOfLifeData?: WheelOfLifeSegment): Promise<any> {
    return this.firestoreService.addCollectionData<any>(
      FirestoreCollections.wheelOfLifeSegments,
      wheelOfLifeData
    );
  }
}
