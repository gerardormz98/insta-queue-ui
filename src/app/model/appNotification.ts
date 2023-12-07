export class AppNotification {
  public id: string = "";
  public title: string = "";
  public description: string = "";
  public style?: NotificationStyle;
}

export class AppAlert {
  public text: string = "";
  public style?: NotificationStyle;
}

export enum NotificationStyle {
  "Danger",
  "Warning",
  "Info",
  "Success"
}
