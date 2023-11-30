export interface Parcel {
  id: number;
  name: string;
  pickupAddress: string;
  dropoffAddress: string;
  sender: number;
  biker?: number;
  pickedAt?: string;
  droppedAt?: string;
}

export interface CreateParcelDto {
  name: string;
  pickupAddress: string;
  dropoffAddress: string;
  sender: number;
}
