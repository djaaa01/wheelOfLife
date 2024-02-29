export class WheelOfLife {
  id?: string;
  uid?: string;
  referralId?: string;
  createdDate?: Date;
}

export class WheelOfLifeSegment {
  id?: string;
  uid?: string;
  sectionColor: string;
  sectionName: string;
  sectionScore: number;
  wheelOfLifeId?: string;
  createdDate?: Date;
}

export class WheelOfLifeResponse {
  id: string;
}
