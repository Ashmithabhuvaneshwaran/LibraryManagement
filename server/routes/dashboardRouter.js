// // routes/dashboardRouter.js
// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const Book = require('../models/Book');
// const Borrowal = require('../models/Borrowal');
// const Review = require('../models/Review');

// router.get('/stats', async (req, res) => {
//   try {
//     const [weeklySales, newUsers, itemOrders, bugReports] = await Promise.all([
//       Borrowal.countDocuments({}),                      // Total borrowals
//       User.countDocuments({}),                          // Total users
//       Book.countDocuments({}),                          // Total books
//       Review.countDocuments({})                         // Reviews as bugs (placeholder)
//     ]);

//     const websiteVisits = [
//       {
//         name: 'Books',
//         type: 'column',
//         fill: 'solid',
//         data: [12, 15, 17, 20, 22, 25, 28],
//       },
//       {
//         name: 'Users',
//         type: 'area',
//         fill: 'gradient',
//         data: [5, 8, 10, 12, 15, 18, 20],
//       },
//       {
//         name: 'Borrowals',
//         type: 'line',
//         fill: 'solid',
//         data: [2, 4, 6, 10, 12, 14, 16],
//       },
//     ];

//     const chartLabels = [
//       '01/07/2025', '02/07/2025', '03/07/2025', '04/07/2025',
//       '05/07/2025', '06/07/2025', '07/07/2025'
//     ];

//     const currentVisits = [
//       { label: 'Fiction', value: 1344 },
//       { label: 'Non-Fiction', value: 2035 },
//       { label: 'Science', value: 734 },
//       { label: 'History', value: 844 },
//     ];

//     res.json({
//       weeklySales,
//       newUsers,
//       itemOrders,
//       bugReports,
//       chartLabels,
//       websiteVisits,
//       currentVisits
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Dashboard stats fetch failed' });
//   }
// });

// module.exports = router;
