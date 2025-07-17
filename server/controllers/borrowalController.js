    const Borrowal = require('../models/borrowal')
    const mongoose = require("mongoose");
    const Book = require("../models/book");

    const getBorrowal = async (req, res) => {
        const borrowalId = req.params.id;

        Borrowal.findById(borrowalId, (err, borrowal) => {
            if (err) {
                return res.status(400).json({ success: false, err });
            }

            return res.status(200).json({
                success: true,
                borrowal
            });
        });
    }

    const getAllBorrowals = async (req, res) => {
        Borrowal.aggregate([{
            $lookup: {
                from: "users",
                localField: "memberId",
                foreignField: "_id",
                as: "member"
            },
        },
            {
                $unwind: "$member"
            },
            {
                $lookup: {
                    from: "books",
                    localField: "bookId",
                    foreignField: "_id",
                    as: "book"
                },
            },
            {
                $unwind: "$book"
            },]).exec((err, borrowals) => {
            if (err) {
                return res.status(400).json({success: false, err});
            }

            return res.status(200).json({
                success: true,
                borrowalsList: borrowals
            });
        })
    }

    // const addBorrowal = async (req, res) => {
    //     const newBorrowal = {
    //         ...req.body,
    //         memberId: mongoose.Types.ObjectId(req.body.memberId),
    //         bookId: mongoose.Types.ObjectId(req.body.bookId)
    //     }

    //     Borrowal.create(newBorrowal, (err, borrowal) => {
    //         if (err) {
    //             return res.status(400).json({success: false, err});
    //         }

    //         Book.findByIdAndUpdate(newBorrowal.bookId, {isAvailable: false}, (err, book) => {
    //             if (err) {
    //                 return res.status(400).json({success: false, err});
    //             }

    //             return res.status(200).json({
    //                 success: true,
    //                 newBorrowal: borrowal
    //             });
    //         });
    //     })
    // }
    const addBorrowal = async (req, res) => {
    try {
        const { memberId, bookId, borrowedDate, status } = req.body;

        // Convert IDs to ObjectId
        const memberObjId = mongoose.Types.ObjectId(memberId);
        const bookObjId = mongoose.Types.ObjectId(bookId);

        // Calculate due date (7 days from borrowed date)
        const borrowDate = new Date(borrowedDate);
        const dueDate = new Date(borrowDate);
        dueDate.setDate(dueDate.getDate() + 7); // Set due date to 7 days later

        // Create new borrowal entry
        const newBorrowal = await Borrowal.create({
        memberId: memberObjId,
        bookId: bookObjId,
        borrowedDate: borrowDate,
        dueDate: dueDate,
        status
        });

        // Mark the book as unavailable
        await Book.findByIdAndUpdate(bookObjId, { isAvailable: false });

        return res.status(200).json({
        success: true,
        newBorrowal
        });

    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
    };

    const updateBorrowal = async (req, res) => {
        const borrowalId = req.params.id
        const updatedBorrowal = req.body

        Borrowal.findByIdAndUpdate(borrowalId,updatedBorrowal, (err, borrowal) => {
            if (err) {
                return res.status(400).json({ success: false, err });
            }

            return res.status(200).json({
                success: true,
                updatedBorrowal: borrowal
            });
        })
    }

    // const deleteBorrowal = async (req, res) => {
    //     const borrowalId = req.params.id

    //     Borrowal.findByIdAndDelete(borrowalId, (err, borrowal) => {
    //         if (err) {
    //             return res.status(400).json({success: false, err});
    //         }

    //         Book.findByIdAndUpdate(borrowal.bookId, {isAvailable: true}, (err, book) => {
    //             if (err) {
    //                 return res.status(400).json({success: false, err});
    //             }

    //             return res.status(200).json({
    //                 success: true,
    //                 deletedBorrowal: borrowal
    //             });
    //         });
    //     })
    // }
    const deleteBorrowal = async (req, res) => {
        const borrowalId = req.params.id;

        try {
            const borrowal = await Borrowal.findByIdAndDelete(borrowalId);

            if (!borrowal) {
                return res.status(404).json({ success: false, message: "Borrowal not found" });
            }

            await Book.findByIdAndUpdate(borrowal.bookId, { isAvailable: true });

            return res.status(200).json({
                success: true,
                deletedBorrowal: borrowal
            });
        } catch (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
    };
//    const returnBorrowal = async (req, res) => {
//   const borrowalId = req.params.id;

//   try {
//     const borrowal = await Borrowal.findById(borrowalId);

//     if (!borrowal) {
//       return res.status(404).json({ success: false, message: "Borrowal not found" });
//     }

//     // Update status and book availability
//     borrowal.status = "Returned";
//     await borrowal.save();

//     await Book.findByIdAndUpdate(borrowal.bookId, { isAvailable: true });

//     return res.status(200).json({
//       success: true,
//       message: "Book returned successfully",
//       borrowal
//     });
//   } catch (err) {
//     return res.status(500).json({ success: false, error: err.message });
//   }
// };
const returnBorrowal = async (req, res) => {
  console.log("Return route hit:", req.params.id); // 👈 Log to confirm route is hit

  const borrowalId = req.params.id;

  try {
    // Find and update borrowal
    const borrowal = await Borrowal.findByIdAndUpdate(
      borrowalId,
      {
        status: "Returned",
        returnedDate: new Date()
      },
      { new: true }
    );

    if (!borrowal) {
      return res.status(404).json({ success: false, message: "Borrowal not found" });
    }

    // Make the book available again
    await Book.findByIdAndUpdate(borrowal.bookId, { isAvailable: true });

    return res.status(200).json({
      success: true,
      returnedBorrowal: borrowal
    });
  } catch (error) {
    console.error("Error in returnBorrowal:", error); // 👈 Extra logging
    return res.status(500).json({ success: false, error: error.message });
  }
};
                

    module.exports = {
        getBorrowal,
        getAllBorrowals,
        addBorrowal,
        updateBorrowal,
        deleteBorrowal,
        returnBorrowal  
    }
