import { supabase } from '@/lib/supabase';
import type { Registration } from '@/lib/supabase';

export const registrationService = {
  async getAllRegistrations() {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching registrations:', error);
        throw new Error(`Failed to fetch registrations: ${error.message}`);
      }

      return data as Registration[];
    } catch (error) {
      console.error('Error in getAllRegistrations:', error);
      throw error;
    }
  },

  async deleteAllRegistrations() {
    try {
      // First, get all registration IDs
      const { data: registrations, error: fetchError } = await supabase
        .from('registrations')
        .select('id');

      if (fetchError) {
        throw new Error(`Failed to fetch registrations: ${fetchError.message}`);
      }

      if (!registrations || registrations.length === 0) {
        return; // No registrations to delete
      }

      // Delete all registrations using IN clause with all IDs
      const ids = registrations.map(reg => reg.id);
      const { error: deleteError } = await supabase
        .from('registrations')
        .delete()
        .in('id', ids);

      if (deleteError) {
        throw new Error(`Failed to delete registrations: ${deleteError.message}`);
      }
    } catch (error) {
      console.error('Error in deleteAllRegistrations:', error);
      throw error;
    }
  },

  async deleteRegistration(id: string) {
    try {
      const { error } = await supabase
        .from('registrations')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting registration:', error);
        throw new Error(`Failed to delete registration: ${error.message}`);
      }
    } catch (error) {
      console.error('Error in deleteRegistration:', error);
      throw error;
    }
  },

  async createRegistration(data: {
    fullName: string;
    mobileNumber: string;
    roomNumber: string;
    groupName: string;
    interests: string[];
    customInterest: string;
    software: string[];
    customSoftware: string;
  }) {
    try {
      console.log('Attempting to create registration with data:', data);

      // Prepare the data for insertion
      const registrationData = {
        full_name: data.fullName,
        mobile_number: data.mobileNumber,
        room_number: data.roomNumber,
        group_name: data.groupName,
        interests: data.interests,
        custom_interest: data.customInterest || null,
        software: data.software,
        custom_software: data.customSoftware || null,
      };

      console.log('Prepared registration data:', registrationData);

      // First, check if we can access the table
      const { data: testData, error: testError } = await supabase
        .from('registrations')
        .select('count')
        .limit(1);

      if (testError) {
        console.error('Table access test failed:', {
          message: testError.message,
          details: testError.details,
          hint: testError.hint,
          code: testError.code
        });
      } else {
        console.log('Table access test successful');
      }

      // Attempt the insert
      const { data: result, error } = await supabase
        .from('registrations')
        .insert([registrationData])
        .select()
        .single();

      if (error) {
        console.error('Supabase error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw new Error(`Registration failed: ${error.message}`);
      }

      console.log('Registration successful:', result);
      return result as Registration;
    } catch (error) {
      console.error('Detailed registration error:', error);
      throw error;
    }
  },

  async getTotalRegistrations() {
    try {
      const { count, error } = await supabase
        .from('registrations')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('Error getting total registrations:', error);
        throw error;
      }
      return count || 0;
    } catch (error) {
      console.error('Error in getTotalRegistrations:', error);
      return 0;
    }
  },

  async getRegistrationsByGroup(groupName: string) {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('group_name', groupName)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Registration[];
    } catch (error) {
      console.error('Error getting registrations by group:', error);
      throw error;
    }
  }
}; 