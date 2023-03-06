export interface FileUp {
  name: string;
  data: any;
  encoding: string;
  tempFilePath: string;
  truncated: boolean;
  mimetype: string;

  mv: Function;
}
