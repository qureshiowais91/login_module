const user = require("../model/user");

//  /api/doctor/account
//  POST
//  return account details as per  ID
exports.account = async (req, res, next) => {
  try {
        const doctor = await user.find(req.body);
        console.log(req.body.username);
        res.status(200).json({
            success: true,
            data: doctor    
        })
    } catch (error) {
        res.status(403).status({
            success: false
        })
    }
}

// exports.removeaccount = async (req, res, next) => {
//     console.log(req.params.id);
//     await user.findByIdAndRemove(req.params.id);
   
//     res.status(200).json({
//         success: true,
//         data: []
//     });
//     next();
// }

// exports.deleteValue = async (req, res, next) => {
//     try {
//       await Doctor.findByIdAndRemove(req.params.id);

//       // res.setHeader('Access-Control-Allow-Origin', '*');
//       // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
//       // res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

//       res.status(202).json({
//         success: true,
//          data: [],
//       });
//       next();
//     } catch (error) {
//       console.log(error);
//     }
//   };

exports.allaccounts = async (req, res, next) => {

    const result = await user.find(req.body);

    res.status(200).json({
        success: true,
        result: result
    });
    next();
}