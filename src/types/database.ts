export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          display_name: string | null
          avatar_url: string | null
          bio: string | null
          is_premium: boolean
          premium_until: string | null
          follower_count: number
          following_count: number
          is_monetized: boolean
          stripe_customer_id: string | null
          stripe_connect_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          display_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          is_premium?: boolean
          premium_until?: string | null
          follower_count?: number
          following_count?: number
          is_monetized?: boolean
          stripe_customer_id?: string | null
          stripe_connect_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          display_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          is_premium?: boolean
          premium_until?: string | null
          follower_count?: number
          following_count?: number
          is_monetized?: boolean
          stripe_customer_id?: string | null
          stripe_connect_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      channels: {
        Row: {
          id: string
          owner_id: string
          name: string
          slug: string
          description: string | null
          thumbnail_url: string | null
          category: string | null
          is_live: boolean
          is_public: boolean
          follower_count: number
          total_views: number
          total_watch_time: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          name: string
          slug: string
          description?: string | null
          thumbnail_url?: string | null
          category?: string | null
          is_live?: boolean
          is_public?: boolean
          follower_count?: number
          total_views?: number
          total_watch_time?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          name?: string
          slug?: string
          description?: string | null
          thumbnail_url?: string | null
          category?: string | null
          is_live?: boolean
          is_public?: boolean
          follower_count?: number
          total_views?: number
          total_watch_time?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "channels_owner_id_fkey"
            columns: ["owner_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      videos: {
        Row: {
          id: string
          channel_id: string
          owner_id: string
          title: string
          description: string | null
          thumbnail_url: string | null
          video_url: string | null
          mux_asset_id: string | null
          mux_playback_id: string | null
          embed_type: string | null  // 'youtube', 'vimeo', 'mux', 'direct'
          embed_id: string | null     // External platform video ID
          duration: number | null
          status: string
          view_count: number
          position: number
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          channel_id: string
          owner_id: string
          title: string
          description?: string | null
          thumbnail_url?: string | null
          video_url?: string | null
          mux_asset_id?: string | null
          mux_playback_id?: string | null
          embed_type?: string | null
          embed_id?: string | null
          duration?: number | null
          status?: string
          view_count?: number
          position?: number
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          channel_id?: string
          owner_id?: string
          title?: string
          description?: string | null
          thumbnail_url?: string | null
          video_url?: string | null
          mux_asset_id?: string | null
          mux_playback_id?: string | null
          embed_type?: string | null
          embed_id?: string | null
          duration?: number | null
          status?: string
          view_count?: number
          position?: number
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "videos_channel_id_fkey"
            columns: ["channel_id"]
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "videos_owner_id_fkey"
            columns: ["owner_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      follows: {
        Row: {
          id: string
          follower_id: string
          channel_id: string
          created_at: string
        }
        Insert: {
          id?: string
          follower_id: string
          channel_id: string
          created_at?: string
        }
        Update: {
          id?: string
          follower_id?: string
          channel_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "follows_follower_id_fkey"
            columns: ["follower_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follows_channel_id_fkey"
            columns: ["channel_id"]
            referencedRelation: "channels"
            referencedColumns: ["id"]
          }
        ]
      }
      watch_history: {
        Row: {
          id: string
          user_id: string
          video_id: string
          channel_id: string
          watch_time: number
          completed: boolean
          last_position: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          video_id: string
          channel_id: string
          watch_time?: number
          completed?: boolean
          last_position?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          video_id?: string
          channel_id?: string
          watch_time?: number
          completed?: boolean
          last_position?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "watch_history_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "watch_history_video_id_fkey"
            columns: ["video_id"]
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "watch_history_channel_id_fkey"
            columns: ["channel_id"]
            referencedRelation: "channels"
            referencedColumns: ["id"]
          }
        ]
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          stripe_subscription_id: string | null
          status: string
          plan: string
          current_period_start: string | null
          current_period_end: string | null
          cancel_at_period_end: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stripe_subscription_id?: string | null
          status: string
          plan?: string
          current_period_start?: string | null
          current_period_end?: string | null
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          stripe_subscription_id?: string | null
          status?: string
          plan?: string
          current_period_start?: string | null
          current_period_end?: string | null
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      earnings: {
        Row: {
          id: string
          user_id: string
          channel_id: string
          amount: number
          period_start: string
          period_end: string
          status: string
          stripe_transfer_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          channel_id: string
          amount: number
          period_start: string
          period_end: string
          status?: string
          stripe_transfer_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          channel_id?: string
          amount?: number
          period_start?: string
          period_end?: string
          status?: string
          stripe_transfer_id?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "earnings_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "earnings_channel_id_fkey"
            columns: ["channel_id"]
            referencedRelation: "channels"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Channel = Database['public']['Tables']['channels']['Row']
export type Video = Database['public']['Tables']['videos']['Row']
export type Follow = Database['public']['Tables']['follows']['Row']
export type WatchHistory = Database['public']['Tables']['watch_history']['Row']
export type Subscription = Database['public']['Tables']['subscriptions']['Row']
export type Earning = Database['public']['Tables']['earnings']['Row']
