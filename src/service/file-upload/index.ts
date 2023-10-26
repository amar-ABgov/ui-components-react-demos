import AbortController, { AbortSignal } from "abort-controller";
import axios from "axios";

export const FILE_SERVICE_URL =
  "https://file-service.adsp.alberta.ca/file/v1/files";

export class FileUploader {
  constructor(accessToken: string) {
    this.accessToken = accessToken;
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }
  private accessToken: string;
  private controller: AbortController;
  private signal: AbortSignal;


  public onprogress: (percent: number) => void = (_: number) => {};
  public onabort: () => void = () => {};
  public onfail: (err: string) => void = (_: string) => {};
  public oncomplete: () => void = () => {};

  async upload(file: any) {
    const formData = new FormData();
    formData.append("type", "ds-user-docs");
    // Use filename to override the original name of the file.
    formData.append("filename", file?.name);
    // Use recordId to reference the associated record.
    // formData.append("recordId", "8bcbc6b1-600a-40c5-99c8-d02734f97ca5");
    formData.append("file", file);
    try {
      await axios.request({
        method: "POST",
        headers: { Authorization: `Bearer ${this.accessToken}` },
        data: formData,
        signal: this.signal as NonNullable<RequestInit["signal"]>,
        url: FILE_SERVICE_URL,
        onUploadProgress: (p) => {
          const progress = Math.round((p.loaded * 100) / p.total);
          this.onprogress(progress);
          if (progress >= 100) {
            this.oncomplete();
          }
        },
      });
    } catch (e) {
      this.onfail(e);
    }
  }

  abort() {
    this.controller.abort();
    this.onabort();
  }
}
