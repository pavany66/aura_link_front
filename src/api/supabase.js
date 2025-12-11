import { supabase } from '../supabaseClient';

// --- PROFILE & USER ---
export const getProfile = async (user) => {
  if (!user) return null;
  const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
  return data;
};

// --- NOTIFICATIONS ---
export const getNotifications = async () => {
  const { data } = await supabase.from('notifications').select('*').order('created_at', { ascending: false });
  return data || [];
};

// --- DOCUMENTS ---
export const getSharedDocuments = async () => {
    const { data } = await supabase.from('documents').select('*').order('uploaded_at', { ascending: false });
    // Create a downloadable URL for each file
    if (data) {
        return data.map(doc => {
            const { data: urlData } = supabase.storage.from('documents').getPublicUrl(doc.file_path);
            return { ...doc, publicURL: urlData.publicUrl };
        });
    }
    return [];
};


// --- ATTENDANCE ---
// This is a placeholder. You'll expand this to fetch real attendance data.
export const getAttendanceSummary = async (studentId) => {
  // In a real app, you would query your 'attendance' table here.
  // For now, we return mock data that matches the chart's needs.
  console.log("Fetching attendance for student:", studentId);
  return {
    average: 85,
    entries: 12,
    chartData: [
      { name: 'Week 1', attendance: 85 },
      { name: 'Week 2', attendance: 90 },
      { name: 'Week 3', attendance: 78 },
      { name: 'Week 4', attendance: 88 },
    ],
  };
};