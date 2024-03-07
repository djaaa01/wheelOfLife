import { Injectable } from '@angular/core';
import {
  WheelOfLife,
  WheelOfLifeResponse,
  WheelOfLifeSegment,
} from '../models/wheel-of-life.model';
import { FirestoreService } from 'src/app/modules/core/services/firestore.service';
import { FirestoreCollections } from 'src/app/modules/core/enums/firestore-colections.enum';
import { Observable } from 'rxjs';
import { NoteSegment } from '../models/note-segment.model';

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

  getSegment(segmentId: string): Promise<WheelOfLifeSegment> {
    return this.firestoreService.getDocumentById<WheelOfLifeSegment>(
      FirestoreCollections.wheelOfLifeSegments,
      segmentId
    );
  }

  getNoteSegments(segmentId: string): Observable<NoteSegment[]> {
    return this.firestoreService.getCollention<NoteSegment>(
      FirestoreCollections.noteSegments,
      'segmentId',
      '==',
      segmentId
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

  addNoteSegment(noteSegmentData?: NoteSegment): Promise<any> {
    return this.firestoreService.addCollectionData<any>(
      FirestoreCollections.noteSegments,
      noteSegmentData
    );
  }

  updateSegment(data: WheelOfLifeSegment): Promise<void> {
    return this.firestoreService.update(
      FirestoreCollections.wheelOfLifeSegments,
      data
    );
  }

  updateNote(data: NoteSegment): Promise<void> {
    return this.firestoreService.update(
      FirestoreCollections.noteSegments,
      data
    );
  }
}
