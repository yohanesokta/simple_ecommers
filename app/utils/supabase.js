import { PrismaClient } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'
const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseURL, supabaseANON)
export const prisma = new PrismaClient();