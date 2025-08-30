export interface TwitchTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface TwitchStream {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  game_id: string;
  game_name: string;
  type: string;
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
  tag_ids: string[];
  tags: string[];
  is_mature: boolean;
}

export interface TwitchChannel {
  broadcaster_language: string;
  broadcaster_login: string;
  display_name: string;
  game_id: string;
  game_name: string;
  id: string;
  is_live: boolean;
  tag_ids: string[];
  tags: string[];
  thumbnail_url: string;
  title: string;
  started_at: string;
}

export interface TwitchGame {
  id: string;
  name: string;
  box_art_url: string;
  igdb_id: string;
}

export interface TwitchVideo {
  id: string;
  stream_id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  title: string;
  description: string;
  created_at: string;
  published_at: string;
  url: string;
  thumbnail_url: string;
  viewable: string;
  view_count: number;
  language: string;
  type: string;
  duration: string;
  muted_segments: any[];
}

export interface TwitchScheduleSegment {
  id: string;
  start_time: string;
  end_time: string;
  title: string;
  canceled_until: string | null;
  category: {
    id: string;
    name: string;
  } | null;
  is_recurring: boolean;
}

export interface TwitchPagination {
  cursor?: string;
}

export interface TwitchApiResponse<T> {
  data: T[];
  pagination?: TwitchPagination;
}

export interface StreamsState {
  streams: TwitchStream[];
  pagination: TwitchPagination;
}

export interface ChannelsState {
  channels: TwitchChannel[];
  pagination: TwitchPagination;
  query?: string;
}

export interface RootState {
  streams: {
    value: StreamsState;
  };
  channels: {
    value: ChannelsState;
  };
}

export interface StreamCardProps {
  stream: TwitchStream;
  sx?: any;
}

export interface StreamListProps {
  streams: TwitchStream[];
  sx?: any;
}

export interface StreamSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  sx?: any;
}

export interface IconTextProps {
  text: string;
  children: React.ReactNode;
  sx?: any;
}

export interface ChannelCardProps {
  channel: TwitchChannel;
  sx?: any;
}

export interface ChannelListProps {
  channels: TwitchChannel[];
  sx?: any;
}

export interface ContentType {
  key: string;
  label: string;
}

export interface Language {
  key: string;
  label: string;
}

export type ApiSuccessCallback<T = any> = (data: T) => void;
export type ApiErrorCallback = (error: any) => void;
