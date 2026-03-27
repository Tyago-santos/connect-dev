import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
export const supabaseAdmin: SupabaseClient = createClient(supabaseUrl, supabaseServiceKey);

export const BUCKET_NAME = 'uploads';
export const AVATARS_FOLDER = 'avatars';
export const COVERS_FOLDER = 'covers';

const ensureSupabaseConfig = () => {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      'SUPABASE_URL ou SUPABASE_SERVICE_KEY não configurados. Verifique o arquivo .env ou variáveis de ambiente.'
    );
  }
};

export const uploadImage = async (
  file: Buffer,
  folder: string,
  fileName: string,
  contentType: string
): Promise<string> => {
  ensureSupabaseConfig();
  const filePath = `${folder}/${fileName}`;
  
  const { data, error } = await supabaseAdmin.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      contentType,
      upsert: true,
    });

  if (error) {
    throw new Error(
      `Falha ao subir arquivo no bucket "${BUCKET_NAME}/${folder}": ${error.message}`,
    );
  }

  const { data: urlData } = supabaseAdmin.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return urlData.publicUrl;
};

export const deleteImage = async (folder: string, fileName: string): Promise<void> => {
  const filePath = `${folder}/${fileName}`;
  
  const { error } = await supabaseAdmin.storage
    .from(BUCKET_NAME)
    .remove([filePath]);

  if (error) {
    throw new Error(`Failed to delete file: ${error.message}`);
  }
};
