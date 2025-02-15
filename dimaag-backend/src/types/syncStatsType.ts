export type SyncStats = {
  processed: number;
  failed: number;
  created: number;
  updated: number;
  errors: Array<{
    userId?: string;
    error: string;
    timestamp: Date;
  }>;
};
