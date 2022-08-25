import { useUtilsStore } from "../../stores/utils/index";

/**
 * Clase que representa las propiedades de una alerta
 */
export class Alert {
  show: boolean;
  type: AlertType;
  message: string;
  timeout: number;
  color: string;
  constructor(
    show: boolean,
    type: AlertType,
    message: string,
    timeout: number
  ) {
    this.show = show;
    this.type = type;
    this.message = message;
    this.timeout = timeout;
    switch (type) {
      case AlertType.Info:
        this.color = "info";
        break;
      case AlertType.Success:
        this.color = "success";
        break;
      case AlertType.Warning:
        this.color = "warning";
        break;
      case AlertType.Error:
        this.color = "red-accent-4";
        break;
      default:
        this.color = "info";
        break;
    }
  }

  static show(props: { type?: AlertType; message: string; timeout?: number }) {
    const utils = useUtilsStore();
    const alert = new Alert(
      true,
      props.type || AlertType.Info,
      props.message,
      props.timeout || 2500
    );

    utils.showAlert(alert);
  }
}

export enum AlertType {
  Info,
  Success,
  Warning,
  Error,
}
