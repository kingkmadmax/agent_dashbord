import { create } from 'zustand';

type Product = {
  id: number;
  name: string;
  imageUrl?: string;
  price?: number;
};

type Booking = {
  id: number;
  customerName: string;
  email: string;
  phone: string;
  pickupLocation: string;
  receiveDate: string;
  returnDate: string;
  rentalDays: number;
  status: string;
  faceImageUrl?: string;
  idImageUrl?: string;
  createdAt: string;
  product: Product;
};

type BookingStore = {
  bookings: Booking[];
  loading: boolean;
  error: string | null;

  fetchMyBookings: (token: string) => Promise<void>;
  clearBookings: () => void;
};

export const useBookingStore = create<BookingStore>((set) => ({
  bookings: [],
  loading: false,
  error: null,

  fetchMyBookings: async (token: string) => {
    if (!token) {
      set({ error: "Token is required", loading: false });
      return;
    }

    set({ loading: true, error: null });

    try {
      const res = await fetch("http://localhost:9090/api/bookings/owner/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await res.json();
      set({ bookings: data, loading: false });
    } catch (err: any) {
      set({
        error: err.message || "Something went wrong",
        loading: false,
      });
    }
  },

  clearBookings: () => set({ bookings: [], error: null }),
}));