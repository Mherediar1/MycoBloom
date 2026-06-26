import { createClient } from '@supabase/supabase-js';
import { HistoryItem, MycoIdentification } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return (
    typeof supabaseUrl === 'string' &&
    supabaseUrl.trim() !== '' &&
    typeof supabaseAnonKey === 'string' &&
    supabaseAnonKey.trim() !== '' &&
    supabaseUrl.startsWith('https://') &&
    supabaseAnonKey.startsWith('sb_publishable_')
  );
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const getOrCreateDeviceId = (): string => {
  let deviceId = localStorage.getItem('myco_device_id');

  if (!deviceId) {
    deviceId =
      'device_' +
      Math.random().toString(36).substring(2, 15) +
      '_' +
      Date.now().toString(36);

    localStorage.setItem('myco_device_id', deviceId);
  }

  return deviceId;
};

const buildHistoryItem = (
  params: any,
  result: MycoIdentification
): HistoryItem => {
  return {
    id: Date.now().toString(),
    date: new Date().toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
    params: {
      sporeSize: params.sporeSize || '',
      shape: params.shape || '',
      color: params.color || '',
      wallNumber: params.wallNumber || '',
      melzerReaction: params.melzerReaction || '',
      hyphalConnection: params.hyphalConnection || '',
      texture: params.texture || '',
      plantasHospederas: params.plantasHospederas || '',
    },
    result,
  };
};

const saveLocalBackup = (item: HistoryItem): void => {
  try {
    const existing = localStorage.getItem('myco_history');
    const history: HistoryItem[] = existing ? JSON.parse(existing) : [];

    history.push(item);
    localStorage.setItem('myco_history', JSON.stringify(history));
  } catch (error) {
    console.error('[LocalStorage] Error guardando respaldo local:', error);
  }
};

export const saveIdentification = async (
  params: any,
  result: MycoIdentification
): Promise<{ id: string; date: string; savedToCloud: boolean }> => {
  const deviceId = getOrCreateDeviceId();
  const item = buildHistoryItem(params, result);

  // Siempre guardar copia local como respaldo
  saveLocalBackup(item);

  console.log('[Supabase Config]', {
    configured: isSupabaseConfigured(),
    hasClient: !!supabase,
    url: supabaseUrl,
    keyStart: supabaseAnonKey.substring(0, 20),
  });

  if (!supabase) {
    console.warn('[Supabase] Cliente no configurado. Usando solo respaldo local.');
    return {
      id: item.id,
      date: item.date,
      savedToCloud: false,
    };
  }

  try {
    const payload = {
      species: result.species || 'Desconocida',
      family: result.family || 'Desconocida',
      confidence: result.confidence ?? null,
      device_id: deviceId,
      input_data: item.params,
      result_data: result,
    };

    console.log('[Supabase Insert Payload]', payload);

    const { data, error } = await supabase
      .from('identifications')
      .insert(payload)
      .select('id, created_at')
      .single();

    if (error) {
      console.error('[Supabase Insert Error]', error);
      console.error('[Supabase Insert Error JSON]', JSON.stringify(error, null, 2));

      return {
        id: item.id,
        date: item.date,
        savedToCloud: false,
      };
    }

    console.log('[Supabase] Registro guardado correctamente:', data);

    return {
      id: data?.id || item.id,
      date: item.date,
      savedToCloud: true,
    };
  } catch (error) {
    console.error('[Supabase Unexpected Error]', error);
    console.error('[Supabase Unexpected Error JSON]', JSON.stringify(error, null, 2));

    return {
      id: item.id,
      date: item.date,
      savedToCloud: false,
    };
  }
};

export const getIdentifications = async (): Promise<{
  items: HistoryItem[];
  isOffline: boolean;
  message?: string;
}> => {
  const deviceId = getOrCreateDeviceId();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('identifications')
        .select('*')
        .eq('device_id', deviceId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('[Supabase Select Error]', error);
        console.error('[Supabase Select Error JSON]', JSON.stringify(error, null, 2));
        throw error;
      }

      const items: HistoryItem[] = (data || []).map((row: any) => {
        const dateString = row.created_at
          ? new Date(row.created_at).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })
          : new Date().toLocaleDateString('es-ES', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            });

        return {
          id: row.id,
          date: dateString,
          params: row.input_data || {},
          result: row.result_data || {},
        };
      });

      return {
        items,
        isOffline: false,
      };
    } catch (error) {
      console.warn('[Supabase] No se pudo cargar historial en nube. Usando localStorage:', error);
    }
  }

  try {
    const saved = localStorage.getItem('myco_history');
    const parsedItems: HistoryItem[] = saved ? JSON.parse(saved) : [];

    return {
      items: [...parsedItems].reverse(),
      isOffline: true,
      message: 'Mostrando historial local porque Supabase no está disponible.',
    };
  } catch (error) {
    console.error('[LocalStorage] Error leyendo historial local:', error);

    return {
      items: [],
      isOffline: true,
      message: 'No se pudo cargar el historial.',
    };
  }
};

export const clearIdentifications = async (): Promise<{
  success: boolean;
  clearedCloud: boolean;
}> => {
  const deviceId = getOrCreateDeviceId();
  let clearedCloud = false;

  if (supabase) {
    try {
      const { error } = await supabase
        .from('identifications')
        .delete()
        .eq('device_id', deviceId);

      if (error) {
        console.error('[Supabase Delete Error]', error);
        throw error;
      }

      clearedCloud = true;
      console.log('[Supabase] Historial eliminado en nube.');
    } catch (error) {
      console.error('[Supabase] No se pudo borrar historial en nube:', error);
    }
  }

  try {
    localStorage.removeItem('myco_history');
  } catch (error) {
    console.error('[LocalStorage] No se pudo borrar historial local:', error);
  }

  return {
    success: true,
    clearedCloud,
  };
};