export interface TokenResponse {
  access_token: string
  refresh_token: string
  expires_in: number
  scope: string[]
  token_type: string
}

export interface UserData {
  data: User[]
}

export interface User {
  id: string
  login: string
  display_name: string
  type: string
  broadcaster_type: string
  description: string
  profile_image_url: string
  offline_image_url: string
  created_at: string
  email?: string
}

export interface Stream {
  id: string
  user_id: string
  user_name: string
  game_id: string
  game_name: string
  title: string
  viewer_count: number
  started_at: string
  language: string
  thumbnail_url: string
  profile_image_url: string
  tag_ids: string[]
  tags: Tag[]
}

export interface Tag {
  tag_id: string
  tag_name: string
}

export interface Channel {
  id: string
  user_name: string
  display_name: string
  broadcaster_language: string
  game_id: string
  game_name: string
  title: string
  followers: number
  profile_image_url: string
  offline_image_url: string
  is_live: boolean
}

export interface ApiResponse<T> {
  data: T[]
  pagination?: {
    cursor: string
  }
}

export interface Pagination {
  cursor: string
}

export interface Category {
  id: string
  name: string
  box_art_url: string
  viewer_count: number
  tag_ids: string[]
  tags: Tag[]
}
