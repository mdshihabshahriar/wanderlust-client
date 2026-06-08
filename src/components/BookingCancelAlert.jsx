"use client";

import {AlertDialog, Button} from "@heroui/react";
import { LuTrash } from "react-icons/lu";

export function BookingCancelAlert({ bookingId }) {
    
    const handleCancel = async () => {
        const res = await fetch(`http://localhost:6001/bookings/${bookingId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        window.location.reload();
    }
  return (
    <AlertDialog>
      <Button variant='none' className="flex items-center gap-1.5 text-sm text-red-700 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
        <LuTrash size={13} /> Cancel
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Cancel booking permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Footer>
              <Button onClick={handleCancel} slot="close" variant="danger">
                Cancel Booking
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
