import { createClient } from "@supabase/supabase-js";
// import { corsHeaders } from "@supabase/functions-js";
// import { serve } from "https://deno.land/std@0.202.0/http/server.ts";
// import { corsHeaders } from "../../../supabase/functions/_shared/cors";

export const supabaseUrl = "https://rhxfuzfkhbmhobfukfxn.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoeGZ1emZraGJtaG9iZnVrZnhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1MTE3NDksImV4cCI6MjA1NzA4Nzc0OX0.qPRfCmNaXbQxQpXz9QYFa8BLK8K5SnpF7AhO7SzDA78";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;