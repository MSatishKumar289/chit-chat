import { createClient } from "@supabase/supabase-js";
// import { corsHeaders } from "@supabase/functions-js";
// import { serve } from "https://deno.land/std@0.202.0/http/server.ts";
// import { corsHeaders } from "../../../supabase/functions/_shared/cors";

export const supabaseUrl = "https://lyhygstmyfkkurwpzwkx.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5aHlnc3RteWZra3Vyd3B6d2t4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI1MjQ0MDUsImV4cCI6MjAzODEwMDQwNX0.YSfrKYcf7b6R8X9RspREHglbB7KbO6ZlsC7_dNowCyQ";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;