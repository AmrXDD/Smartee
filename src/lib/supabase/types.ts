/**
 * Generated Supabase schema types live here once the project is wired.
 * For now we expose a minimal Database type that future tables hang off.
 */
export type Database = {
  public: {
    Tables: {
      consultations: {
        Row: {
          id: string;
          created_at: string;
          full_name: string;
          phone: string;
          treatment_interest: string | null;
          notes: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["consultations"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["consultations"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
