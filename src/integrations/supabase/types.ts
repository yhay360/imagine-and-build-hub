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
      academic_documents: {
        Row: {
          content: string
          created_at: string
          file_path: string | null
          file_type: string | null
          id: string
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          file_path?: string | null
          file_type?: string | null
          id?: string
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          file_path?: string | null
          file_type?: string | null
          id?: string
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      api_keys: {
        Row: {
          created_at: string
          huggingface_key: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          huggingface_key: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          huggingface_key?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      image_analysis_results: {
        Row: {
          confidence: number
          created_at: string
          details: Json | null
          id: string
          image_hash: string
          updated_at: string
          verdict: string
        }
        Insert: {
          confidence: number
          created_at?: string
          details?: Json | null
          id?: string
          image_hash: string
          updated_at?: string
          verdict: string
        }
        Update: {
          confidence?: number
          created_at?: string
          details?: Json | null
          id?: string
          image_hash?: string
          updated_at?: string
          verdict?: string
        }
        Relationships: []
      }
      plagiarism_results: {
        Row: {
          created_at: string
          id: string
          matched_sources: Json | null
          similarity_score: number
          text_content: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          matched_sources?: Json | null
          similarity_score: number
          text_content: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          matched_sources?: Json | null
          similarity_score?: number
          text_content?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      similarity_results: {
        Row: {
          compared_with_id: string | null
          created_at: string
          document_id: string | null
          id: string
          matched_segments: Json | null
          similarity_score: number
          status: Database["public"]["Enums"]["processing_status"] | null
          updated_at: string
        }
        Insert: {
          compared_with_id?: string | null
          created_at?: string
          document_id?: string | null
          id?: string
          matched_segments?: Json | null
          similarity_score: number
          status?: Database["public"]["Enums"]["processing_status"] | null
          updated_at?: string
        }
        Update: {
          compared_with_id?: string | null
          created_at?: string
          document_id?: string | null
          id?: string
          matched_segments?: Json | null
          similarity_score?: number
          status?: Database["public"]["Enums"]["processing_status"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "similarity_results_compared_with_id_fkey"
            columns: ["compared_with_id"]
            isOneToOne: false
            referencedRelation: "academic_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "similarity_results_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "academic_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          created_at: string
          description: string | null
          features: Json | null
          id: string
          name: string
          price_usd: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          name: string
          price_usd: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          name?: string
          price_usd?: number
          updated_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string | null
          crypto_amount: number | null
          crypto_currency: Database["public"]["Enums"]["crypto_currency"] | null
          crypto_payment_address: string | null
          ends_at: string | null
          id: string
          invoice_email_id: string | null
          invoice_sent: boolean | null
          nowpayments_currency: string | null
          nowpayments_payment_id: string | null
          nowpayments_payment_status: string | null
          payment_id: string | null
          payment_status: string | null
          starts_at: string | null
          tier: Database["public"]["Enums"]["subscription_tier"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          crypto_amount?: number | null
          crypto_currency?:
            | Database["public"]["Enums"]["crypto_currency"]
            | null
          crypto_payment_address?: string | null
          ends_at?: string | null
          id?: string
          invoice_email_id?: string | null
          invoice_sent?: boolean | null
          nowpayments_currency?: string | null
          nowpayments_payment_id?: string | null
          nowpayments_payment_status?: string | null
          payment_id?: string | null
          payment_status?: string | null
          starts_at?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          crypto_amount?: number | null
          crypto_currency?:
            | Database["public"]["Enums"]["crypto_currency"]
            | null
          crypto_payment_address?: string | null
          ends_at?: string | null
          id?: string
          invoice_email_id?: string | null
          invoice_sent?: boolean | null
          nowpayments_currency?: string | null
          nowpayments_payment_id?: string | null
          nowpayments_payment_status?: string | null
          payment_id?: string | null
          payment_status?: string | null
          starts_at?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      text_comparison_results: {
        Row: {
          created_at: string
          id: string
          online_matches: Json | null
          segment_matches: Json | null
          similarity_score: number
          text1_content: string
          text1_file_path: string | null
          text2_content: string
          text2_file_path: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          online_matches?: Json | null
          segment_matches?: Json | null
          similarity_score: number
          text1_content: string
          text1_file_path?: string | null
          text2_content: string
          text2_file_path?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          online_matches?: Json | null
          segment_matches?: Json | null
          similarity_score?: number
          text1_content?: string
          text1_file_path?: string | null
          text2_content?: string
          text2_file_path?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      todos: {
        Row: {
          completed: boolean | null
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          id?: string
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      usage_limits: {
        Row: {
          created_at: string | null
          id: string
          image_analysis_count: number | null
          last_reset: string | null
          online_search_count: number | null
          text_analysis_count: number | null
          text_comparison_count: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_analysis_count?: number | null
          last_reset?: string | null
          online_search_count?: number | null
          text_analysis_count?: number | null
          text_comparison_count?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          image_analysis_count?: number | null
          last_reset?: string | null
          online_search_count?: number | null
          text_analysis_count?: number | null
          text_comparison_count?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      usage_logs: {
        Row: {
          count: number | null
          created_at: string | null
          id: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          count?: number | null
          created_at?: string | null
          id?: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          count?: number | null
          created_at?: string | null
          id?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      crypto_currency: "BTC" | "ETH" | "USDT"
      processing_status: "pending" | "processing" | "completed" | "failed"
      subscription_tier: "free" | "premium"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
