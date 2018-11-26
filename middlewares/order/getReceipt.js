var requireOption = require('../common').requireOption;
const PDFDocument = require('pdfkit');
var FileSystem = require('fs');


module.exports = function (objectrepository) {

    var OrderStatus = requireOption(objectrepository, 'orderStatus');

    return function (req, res, next) {
        if (typeof res.tpl.order === "undefined" || res.tpl.order === null) {
            res.tpl.error = "Cant find order model";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }

        if (res.tpl.order.status === OrderStatus.Open) {
            res.tpl.error = "Cant print unfinished receipt";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }

        if (typeof res.tpl.menuItems === "undefined" ) {
            res.tpl.error = "Missing menuItems";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }

        res.tpl.order.status = OrderStatus.Closed;
        res.tpl.order.save(function (err) {
            if (err) {
                res.tpl.error = "Error DB during saving order to DB";
                console.log(res.tpl.error);
                return res.status(500).json(res.tpl.error);
            }

            res.contentType('application/pdf');
            res.attachment('orderExport'+res.tpl.order._id+'.pdf');
            var doc = new PDFDocument();
            var stream = doc.pipe(res);

            doc.font('Times-Roman').fontSize(28).text("Receipt from a very great restaurant ktf!",{underline:true}).moveDown(0.5);
            doc.fontSize(12);
            doc.text("Order date:",{align: 'left', fill:true, underline: true, continued:true})
                .text("  "+res.tpl.order.time.toDateString(),{stroke:false,underline:false});

            doc.moveDown(0.5).text("Order:",{ fill:true, underline: true}).moveDown(0.2);

            res.tpl.order.orderItems.forEach(function (item) {
                var mItem = res.tpl.menuItems.find(m=>m.menuItemId==item._menuItemId);
                if(mItem)
                    doc.text((mItem.price*item.amount).toString() + "Ft - " + item.amount + "db  << " +
                    mItem.name + "  " + mItem.price + "Ft / db", {align: 'left'});
            });
            doc.text("Discount: " + res.tpl.order.discount + " %",{fontSize:11 });
            doc.text("                                                 ",{underline:true});
            doc.text("Sum: " + res.tpl.order.sum + " Ft",{fontSize:14,stroke:true, fill:true} );
            doc.end();
            stream.on('finish', function () {
                //var url = stream.toBlobURL('application/pdf');
                //return stream.pipe(res);
            });

            //return res.sendStatus(200);
        });




    };
}

