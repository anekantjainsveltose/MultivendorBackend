const express = require('express');
const router = express.Router();

const {
    addterm_condition,
    getall_term_condition,
    del_term_condition,
    viewone_term_condition,
}=require('../controller/Termsandcondition');

router.post("/admin/addterm_condition", addterm_condition);

router.get("/admin/getall_term_condition", getall_term_condition);

router.delete("/admin/del_term_condition/:id", del_term_condition);

router.get("/admin/viewone_term_condition/:id", viewone_term_condition);



module.exports = router;