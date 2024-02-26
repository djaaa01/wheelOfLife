export class WheelOfLife {
  id?: string;
  uid?: string;
  referralId?: string;
}

export class WheelOfLifeSegment {
  uid?: string;
  sectionColor: string;
  sectionName: string;
  sectionScore: number;
  wheelOfLifeId?: string;
}

export class WheelOfLifeResponse {
  id: string;
}
