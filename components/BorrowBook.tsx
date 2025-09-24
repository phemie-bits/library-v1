"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { borrowBook } from "@/lib/actions/book";
import { toast } from "sonner";

interface Props {
  userId: string;
  bookId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  };
}

const BorrowBook = ({
  userId,
  bookId,
  borrowingEligibility: { isEligible, message },
}: Props) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);

  const handleBorrowBook = async () => {
    if (!isEligible) {
      toast("Error", {
        description: message,
        action: {
          label: "Okay",
          onClick: () => {},
        },
      });
    }

    setBorrowing(true);

    try {
      const result = await borrowBook({ bookId, userId });

      if (result.success) {
        toast("Success", {
          description: "Book borrowed successfully",
          action: {
            label: "Okay",
            onClick: () => {},
          },
        });

        router.push("/");
      } else {
        toast("Error", {
          description: result.error,
          action: {
            label: "Okay",
            onClick: () => {},
          },
        });
      }
    } catch (error) {
      toast("Error", {
        description: "An error occurred while borrowing the book",
        action: {
          label: "Okay",
          onClick: () => {},
        },
      });
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <Button
      className="book-overview_btn"
      onClick={handleBorrowBook}
      disabled={borrowing}
    >
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">
        {borrowing ? "Borrowing ..." : "Borrow Book"}
      </p>
    </Button>
  );
};
export default BorrowBook;
