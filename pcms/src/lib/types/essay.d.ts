export interface EssayBase {
  id: number;
  title: string;
  content: string | null;
  create_dt: string; // Use ISO 8601 string format for dates
  lastmodify_dt: string | null; // Can be a string (date) or null
}
export interface EssayListResponse {
  list : EssayBase[];
  exists_next : boolean;
  last_index:  number;
  data_count : number;
  page_size : number;
  start_index : number;
}