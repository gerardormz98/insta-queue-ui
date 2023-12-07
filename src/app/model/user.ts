export class User {
  public userId: string;
  public name: string;
  public partySize: number = 1;
  public currentPosition: number = 1;
  public checkInTime: Date;
  public notifyCount: number = 0;
}
