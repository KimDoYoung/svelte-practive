interface EssayBase {
  id: number;
  title: string;
  content: string | null;
  create_dt: string; // Use ISO 8601 string format for dates
  lastmodify_dt: string | null; // Can be a string (date) or null
}