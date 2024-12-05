export interface SnoteBase {
  id: number; // Primary key, auto-increment
  title?: string; // Optional field
  create_dt: string; // Timestamp, default to current timestamp
  hint?: string; // Optional field
  note?: string; // Optional field
}

export interface SnoteCreate {
  title?: string;
  hint?: string;
  note?: string;
  password?: string;
}