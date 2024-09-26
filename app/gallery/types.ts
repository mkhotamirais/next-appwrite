export type Bucket = {
  $createdAt: string;
  $id: string;
  $permissions: string[];
  $updatedAt: string;
  bucketId: string;
  chunksTotal: number;
  chunksUploaded: number;
  mimeType: string;
  name: string;
  signature: string;
  sizeOriginal: number;
};
