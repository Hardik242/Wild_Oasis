import {createClient} from "@supabase/supabase-js";
const supabaseUrl = "https://sffirbrxnnzifrfpvwtr.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmZmlyYnJ4bm56aWZyZnB2d3RyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY5ODE2NDMsImV4cCI6MjAzMjU1NzY0M30.-FI-qd7H60fH2YZdzmuOr_S9ztrmUREc0RwlgGL27Gc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
