export type TPresignedUrlInput = Pick<File, "name" | "type">;

export type TPresignedUrlFileDto = TPresignedUrlInput[];

export type TPresignedFileUrl = TPresignedUrlInput & {
  signedUrl: string;
};
