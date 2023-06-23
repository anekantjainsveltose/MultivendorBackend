const express= require("express");
const router = express.Router();



const {
    
    addorder,
    allorder_list,
    viewone_order,
    del_order,
    edit_order,
    pending_order,
    complete_order,
    delivery_order,
    total_order,
    canceled_order,
    out_of_delivery,
    inprocess_order,
    returned_order,
    customer_order_list,
    assinged_driver,
    assinged_product_list,
    assinged_product_viewone_list,
    getall_assinged_drive,
    top_selling,
  
}=require('../controller/order');


router.post('/admin/addorder', addorder);

router.get('/admin/allorder_list', allorder_list);

router.get('/admin/viewone_order/:id', viewone_order);

router.delete('/admin/del_order/:id', del_order);   

router.post('/admin/edit_order/:id', edit_order);   

router.get('/admin/pending_order', pending_order);   

router.get('/admin/complete_order', complete_order);  
 
router.get('/admin/delivery_order', delivery_order);   

router.get('/admin/total_order', total_order);   

router.get('/admin/canceled_order', canceled_order);  

router.get('/admin/out_of_delivery', out_of_delivery);  

router.get('/admin/inprocess_order', inprocess_order)

router.get('/admin/returned_order', returned_order)

router.get('/admin/customer_order_list/:id', customer_order_list)

router.post('/admin/assinged_driver/:id', assinged_driver)

router.get('/admin/assinged_product_list/:id', assinged_product_list)

router.get('/admin/assinged_product_viewone_list/:id', assinged_product_viewone_list)

router.get('/admin/getall_assinged_drive', getall_assinged_drive)

router.get('/admin/top_selling', top_selling)

module.exports = router;