export interface FindTop {
  type: string;
  limit?: number;
  time_range?: 'medium_term' | 'short_term' | 'long_term';
}
