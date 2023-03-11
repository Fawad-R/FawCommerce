let stripe_key = "sk_test_51MFGxxGsyHFe5lQAVDUF7uO8Mwt4HBVeJFFVVl2YUkQDcru02MdQcen3kuaoNt2yfTIs8lI17KONHfpGyzoekMnQ00uJ6clGOz";
// require
const express = require('express');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const stripe = require('stripe')(stripe_key);
let path=require("path")
// db
mongoose.connect('mongodb+srv://FawadRahman55:<C8vpTLoXYl58tiRF>@cluster0.apjzjsq.mongodb.net/?retryWrites=true&w=majority')

// app 
let key = 'fawdhawdjajdalkd;alksvhasoijvw9ru209842-id-0akczklcnalcmalkcmalxsmc;alca;lkca'
let app = express();
// middleware
app.use(cookieParser());
app.use(express.json())
app.use(express.static(path.join(__dirname,"./client/build")));
// schemas
// user
let user = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        // required: true,
    },
    address: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        // required: true
    },
},
    { timestamps: true }
)
let contactUs = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    subject: {
        type: String,
    },
    message: {
        type: String,
    },
},
    { timestamps: true }
)
// Generating tokens
user.methods.generateAuthToken = async function () {
    let token = await jsonwebtoken.sign({ _id: this._id, isAdmin: this.isAdmin }, key);
    // console.log('token', token);
    this.token = token;
    // this.save();
    return token;
}
//product
let product = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        // required: true
    },
    categories: {
        type: Array,
        default: []
    },
    size: {
        type: Array,
        default: ["Medium"]
    },
    color: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
},
    { timestamps: true }
)
//cart
let cart = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    products:
        [
            {
                productId: {
                    type: String,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
                size: {
                    type: String,
                    default: 'Medium',
                },
            }
        ]
    ,
})
//order
let order = new mongoose.Schema({
    userId: {
        type: String, 
        required: true,
    },
    products: [
        {
            productId: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1,
            },
        }
    ],
    amount: {
        type: Number,
        required: true
    },
    address: {
        // type: String,
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    },
})

//wishlist
let wishlist = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    products: [
        {
            productId: {
                type: String
            },
        }
    ],
})


//Authentication
let Auth = async (req, res, Next) => {
    try {
        // res.c
        let headerToken;
        if (req.headers.token) {
            headerToken = req.headers.token;
        }
        else if (req.cookies.User) {
            headerToken = req.cookies.User;
        }
        await jsonwebtoken.verify(headerToken, key, (err, user) => {
            if (err) {
                return res.status(403).send('Not authenticated');
            }
            req.user = user;
            // console.log(req.user);
            Next();
        }
        )
    } catch (error) {
        res.status(404).send('error');
    }
}
// models
let userModel = new mongoose.model('user', user);
let productModel = new mongoose.model('product', product);
let cartModel = new mongoose.model('cart', cart);
let orderModel = new mongoose.model('order', order);
let wishlistModel = new mongoose.model('wishlist', wishlist);
let contactUsModel = new mongoose.model('contact', contactUs);

// apis

//user
// (post)
app.post('/contactUs', async (req, res) => {
    let val = await contactUsModel(req.body);
    try {
        val.save();
        res.status(200).send('val');
    } catch (error) {
        res.status(404).send(error);
    }
})
app.post('/register', async (req, res) => {
    try {
        let val = await userModel(req.body);
        await val.generateAuthToken();
        let e = await bcryptjs.hash(req.body.password, 10);
        val.password = e;
        val.save();
        res.status(200).send('val');
    } catch (error) {
        res.status(404).send(error);
    }
})
app.post('/login', async (req, res) => {
    let val = await userModel.findOne({ email: req.body.email });
    try {
        let e = await bcryptjs.compare(req.body.password, val.password);
        if (e) {
            let token = await val.generateAuthToken();
            res.cookie('User', token);
            // console.log('val',val);
            // res.status(200).json(val);
            res.send(val);
        }
        else {
            res.status(403).send('Error! Incorrect username or password');
        }
    } catch (error) {
        res.status(404).send(error);
    }
})
// (get)
app.get('/user/user/:email', Auth, async (req, res) => {
    // console.log(req.params.email);
    let val = await userModel.findOne({ email: req.params.email })
    try {
        // console.log('running');
        // if (req.params.id === req.user._id || req.user.isAdmin) {
        //     console.log('running2');
            // let { password, ...others } = val_doc;
        //     res.status(200).send(others);
        // }
        // else {
            //     res.status(403).send('YOu can only view your content');
            // }
            // console.log(val);
        res.status(200).send(val);
        } catch (error) {
        res.status(404).send(error);
    }
})
app.get('/user/:id', Auth, async (req, res) => {
    let val = await userModel.findOne({ _id: req.params.id })
    try {
        // console.log('running');
        if (req.params.id === req.user._id || req.user.isAdmin) {
            // console.log('running2');
            // let { password, ...others } = val_doc;
            res.status(200).send(val);
        }
        else {
            res.status(403).send('YOu can only view your content');
        }
    } catch (error) {
        res.status(404).send(error);
    }
})
app.get('/users/:id', Auth, async (req, res) => {
    // console.log('users');
    let val = await userModel.findOne({ _id: req.user._id })
    try {
        // let { password, ...others } = val_doc;
        // console.log('req.params.id',req.params.id);
        // console.log('req.user._id',req.user._id);
        if (req.params.id === req.user._id || req.user.isAdmin) {
        res.status(200).send(val._id);
        }
        else {
            res.status(403).send('YOu can only view your content');
        }
    } catch (error) {
        res.status(404).send(error);
    }
})
app.get('/user', Auth, async (req, res) => {
    let query = req.query.new;
    // console.log('I am user');
    let val = query ? await userModel.find().limit(5).sort({ _id: -1 }) : await userModel.find()
    try {
        // console.log('req.user.isAdmin', req.user.isAdmin);
        if (req.user.isAdmin) {
            // let {password,...others}=val_doc;
            res.status(200).send(val);
        }
        else {
            res.status(403).send('YOu can only view your content');
        }
    } catch (error) {
        res.status(404).send(error);
    }
})
app.get('/user/stats/stats', Auth, async (req, res) => {
    // let query=req.query.new;
    // console.log('running');
    let date = new Date();
    let lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        if (req.user.isAdmin) {
            // console.log('req.user.isAdmin', req.user.isAdmin);
            let val = await userModel.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: lastYear
                        }
                    }
                },
                {
                    $project: {
                        month:
                        {
                            $month: "$createdAt"
                        }
                    }
                },
                {
                    $group: {
                        _id: "$month",
                        total: { $sum: 1 }
                    }
                }
            ])
            res.status(200).send(val);
        }
        else {
            res.status(403).send('YOu can only view your content');
        }
    } catch (error) {
        res.status(404).send(error);
    }
})
//(put)
app.put('/user/:id', Auth, async (req, res) => {
    let val = await userModel.findOneAndUpdate({ _id: req.params.id }, (req.body), {
        new: true
    })
    try {
        if (req.params.id === req.user._id || req.user.isAdmin) {
            res.status(200).send(val);
        }
        else {
            res.status(403).send('YOu can only view your content');
        }
    } catch (error) {
        res.status(404).send(error);
    }
})
//(delete)
app.delete('/user/:id', Auth, async (req, res) => {
    // console.log('deleting...');
    try {
        if (req.params.id === req.user._id || req.user.isAdmin) {
            let val = await userModel.findOneAndDelete({ _id: req.params.id })
            res.clearCookie('User');
            res.status(200).send('val');
        }
        else {
            res.status(403).send('YOu can only view your content');
        }
    } catch (error) {
        res.status(404).send(error);
    }
})

//product
app.post('/product', Auth, async (req, res) => {
    let val = await productModel(req.body);
    // console.log(val);
    try {
        val.save();
        res.status(200).send(val);
    } catch (error) {
        res.status(404).send(error);
    }
})
// (get)
app.get('/product/:id', async (req, res) => {
    let val = await productModel.findOne({ _id: req.params.id })
    try {
        res.status(200).send(val);
    } catch (error) {
        res.status(404).send(error);
    }
})
app.get('/product', Auth, async (req, res) => {
    let query;
    let category_query;
    // console.log('I am product');
    if (req.query.new) {
        query = req.query.new;
    }
    if (req.query.category) {
        category_query = req.query.category;
    }
    try {
        val = query ? await productModel.find().limit(5).sort({ _id: -1 }) : val = category_query ? await productModel.find({ categories: { $in: [category_query] } }) : await productModel.find()
        res.status(200).send(val);
    } catch (error) {
        res.status(404).send('error hun ustd');
    }
})
//(put)
app.put('/product/:id', Auth, async (req, res) => {
    let val = await productModel.findOneAndUpdate({ _id: req.params.id }, (req.body), {
        new: true
    })
    try {
        if (req.params.id === req.user._id || req.user.isAdmin) {
            res.status(200).send(val);
        }
        else {
            res.status(403).send('YOu can only view your content');
        }
    } catch (error) {
        res.status(404).send(error);
    }
})
//(delete)
// , Auth
app.delete('/product/:id', async (req, res) => {
    try {
        let val = await productModel.findOneAndDelete({ _id: req.params.id })
        res.status(200).send('val');
        // if (req.params.id === req.user._id || req.user.isAdmin) {
        // }
        // else {
        //     res.status(403).send('YOu can only view your content');
        // }
    } catch (error) {
        res.status(404).send(error);
    }
})


//order
app.post('/order', Auth, async (req, res) => {
    try {
    let val = await orderModel({userId:req.user._id, ...req.body});
    // console.log(val);
        val.save();
        res.status(200).send(val);
    } catch (error) {
        res.status(404).send(error);
    }
})
// (get)
app.get('/order/:id', Auth, async (req, res) => {
    try {
        if (req.params.id === req.user._id) {
            // let val = await cartModel.findOne({ _id: req.params.id })
            let val = await orderModel.findOne({ userId: req.params.id })
        }
        res.status(200).send(val);
    } catch (error) {
        res.status(404).send(error);
    }
})
app.get('/order', Auth, async (req, res) => {
    try {
        if (req.user.isAdmin) {
            let val = await orderModel.find();
            res.status(200).send(val);
        }
    } catch (error) {
        res.status(404).send(error);
    }
})
//(put)
app.put('/order/:id', Auth, async (req, res) => {
    let val = await orderModel.findOneAndUpdate({ _id: req.params.id }, (req.body), {
        new: true
    })
    try {
        if (req.params.id === req.user._id || req.user.isAdmin) {
            res.status(200).send(val);
        }
        else {
            res.status(403).send('YOu can only view your content');
        }
    } catch (error) {
        res.status(404).send(error);
    }
})
//(delete)
app.delete('/order/:id', Auth, async (req, res) => {
    let val = await orderModel.findOneAndDelete({ _id: req.params.id }, (req.body), {
        new: true
    })
    try {
        if (req.params.id === req.user._id || req.user.isAdmin) {
            res.status(200).send('val');
        }
        else {
            res.status(403).send('YOu can only view your content');
        }
    } catch (error) {
        res.status(404).send(error);
    }
})

//cart
app.post('/cart', Auth, async (req, res) => {
// console.log('i am cart');
// console.log(req.body);
try {
    let val=await cartModel.findOne({userId:req.user._id})
    let objFriends = {  
        productId:req.body.productId,
        quantity:req.body.quantity,
        size:req.body.size 
        // productId:req.body.productId,quantity:req.body.quantity,size:req.body.size
    };
    if (val) {
        // console.log('haha');
        let val2=await cartModel.updateOne({userId:req.user._id},{$push:{products:[objFriends]}}) ; 
        // console.log(val2);
        // let val3=await val2.save()
        res.status(200).send(val2)
    }
    else
    {
        // console.log(val);
        let val2=await cartModel({userId:req.user._id,products:[objFriends]}) ; 
        // console.log(val2);
        await val2.save()
        res.status(200).send(val2)
        }
        
        // let val2=await cartModel({userId:req.user._id,})
        // let val = await wishlistModel(req.body);   
        // let val2=await cartModel({userId:req.user._id,person.products.push(friend)}) ; 
        // let val2=await cartModel({userId:req.user._id},{ $push:{products:[{productId:req.body.productId,quantity:req.body.quantity,size:req.body.size}]}}});
        // { $push: { friends: friend } }   
        // let val = await wishlistModel(req.body);
        // let val2=await cartModel({userId:req.user._id},{$push:{products:[{productId:req.body.productId}]}});
        // let val2=await cartModel({userId:req.user._id,$push:{products:[objFriends]}}) ; 
        // let val2=await cartModel({userId:req.user._id,person.products.push(friend)}) ; 
        // let val2=await cartModel({userId:req.user._id},{ $push:{products:[{productId:req.body.productId,quantity:req.body.quantity,size:req.body.size}]}}});
        // { $push: { friends: friend } }
        // let val2=await cartModel({userId:req.user._id,})
} catch (error) {
    res.status(404).send(error);
}
})
// (get)
app.get('/cart/cart/cart/cart/:id', Auth, async (req, res) => {
    try {
        // console.log('req.params.id', req.params.id);
        // console.log('req.user._id', req.user._id);
        if (req.params.id === req.user._id) {
            let val = await cartModel.findOne({ userId: req.user._id })
            // console.log('val',val);
            let val3;
            let val4=[];
            let myfunc=async(e,ind)=>{
                    // console.log('e',e);
               let val2 =await productModel.find({ _id: e})
                // console.log('val2',val2);
                // val4+=val2;
                val4.push(val2);
                // console.log('val4 inside',val4);
                if (val.products.length-1==ind) {
                    // console.log('val.products.length-1',val.products.length-1);
                    // console.log('ind',ind);
                    // console.log('val4',val4);
                    // console.log('val4',val4.flat());
                    res.status(200).send(val4.flat());
                }
                return val2;
            }
            val3= val.products.map((ele,ind)=>{
                // console.log('val.products.length',val.products.length);
                // console.log('ele',ele.productId);
                myfunc(ele.productId,ind)
            })

            // console.log('val4 outside',val4);
             
        }
    } catch (error) {
        res.status(404).send(error);
    }
})
app.get('/carts', Auth, async (req, res) => {
    try {
        // console.log('i am server cart');
        if (req.user.isAdmin) {
            let val = await cartModel.find();
            res.status(200).send(val);
        }
    } catch (error) {
        res.status(404).send(error);
    }
})
//(put)
app.put('/cart/:id', Auth, async (req, res) => {
    let val = await cartModel.findOneAndUpdate({ _id: req.params.id }, (req.body), {
        new: true
    })
    try {
        if (req.params.id === req.user._id || req.user.isAdmin) {
            res.status(200).send(val);
        }
        else {
            res.status(403).send('YOu can only view your content');
        }
    } catch (error) {
        res.status(404).send(error);
    }
})
//(delete)
app.delete('/cart/:id',Auth,async(req,res)=>{
// let val= await cartModel.updateMany({},{
//         $pull: {
//           'products': mongoose.Types.ObjectId(req.params.id)
//         },
//       }).exec();
let val=await cartModel.updateOne( 
    { userId: req.user._id },
    {
        $pull: {
            products: { productId : req.params.id }
        }
    }
);
// console.log('val in delete',val);     
        let val2=await val;
        res.status(200).send(val2);
})


// app.delete('/cart/:id', Auth, async (req, res) => {
//     // let val = await cartModel.findOneAndDelete({ _id: req.params.id })
//     // let val = await cartModel.findOneAndDelete({ productId: req.params.id })
//     try {
//         console.log(req.params.id);
//         let val=await cartModel.findOne({userId:req.user._id})
//         let objFriends = {  productId:req.body.productId};
//         // if (req.params.id === req.user._id || req.user.isAdmin) {
//             let func=async(w,ind)=>{

//                 // console.log('val',val);
//                 // console.log('valproducts',val.products);
//                 console.log('val.products.productId',val.products[ind].productId);
//                 // let val2=await val.updateOne({userId:req.user._id},{$pull:{products:{productId:w}}}) ; 
//                 console.log(w);
//                 if(val.products[ind].productId===w)
//                 {
                    
//                     console.log('running...');
//                     console.log(val.products[ind].productId);
//                     console.log(w);
//                     console.log(val);
//                     let val2=await (val.products[ind].productId = '') ; 
//                     // let val2=await cartModel.deleteOne({products:[val.products[ind].productId]}) ; 
//                     console.log(val2);
//                     let val3=await val2.save()
//                 }
//                 // let val2=await cartModel.updateOne({ userId:req.user._id }, { $pull: { products: [{productId:w}] } })
//                 res.status(200).send(val3)
//             }

//             if (req.user._id || req.user.isAdmin) {
//                 val3= val.products.map((ele,ind)=>{
//                     if(ele.productId===req.params.id)
//                     {
//                         console.log('ele',ele.productId);
//                         console.log('ele',req.params.id);
//                         func(ele.productId,ind);
//                     }
                    
//                 })
                
//                 // console.log(val);
//                 // await val.updateOne({$pull:{products:[{productId:req.params.id}]}});
//                 // let val2=await cartModel.updateOne({userId:req.user._id},{$push:{products:[objFriends]}}) ; 
//                 // let val=await cartModel.deleteOne({userId:req.user._id},{$pull:{products:[objFriends]}}) ; 
//                 // let val=await cartModel.updateOne({userId:req.user._id},{$pull:{products:[objFriends]}}) ; 
//             // let val=await cartModel.updateOne({$pull:{products:[objFriends]}}) ; 
//             // await paramsidUser.updateOne({$pull:{subscribedUsers:req.body._id}});
//             console.log(val);
//             // res.status(200).send(val);
//         }
//         else {
//             res.status(403).send('YOu can only view your content');
//         }
//     } catch (error) {
//         res.status(404).send(error);
//     }
// })
// Monthly income
// (get)

// ,Auth
app.get('/income', async (req, res) => {
    let date = new Date();
    let lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    let prevMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
    try {
        let val = await orderModel.aggregate(
            [
                {
                    $match: { createdAt: { $gte: prevMonth } }
                },
                {
                    $project: {
                        month:
                        {
                            $month: "$createdAt",
                        },
                        // sales:{
                        sales: "$amount"
                        // },
                    }
                },
                {
                    $group: {
                        _id: "$month",
                        total: { $sum: "$sales" }
                    }
                }
            ])
        // console.log(date);
        // console.log(val);
        res.status(200).send(val)
    } catch (error) {
        res.status(404).send('error')
    }
})

//Payment
app.post('/payment', async (req, res) => {
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd"
        },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                res.status(404).send(stripeErr);
            }
            else {
                // console.log(stripeRes);
                // stripeRes.save()
                res.status(200).send(stripeRes);
            }
        }
    )
})

//wishlist
app.post('/wishlist', Auth, async (req, res) => {
    let val = await wishlistModel(req.body);
    try {
        val.save();
        res.status(200).send(val);
    } catch (error) {
        res.status(404).send(error);
    }
})
//signout 
app.get('/signout', Auth, async (req, res) => {
    res.clearCookie("User");
    try {
        // val.save();
        res.status(200).send(val);
    } catch (error) {
        res.status(404).send(error);
    }
})

app.get("*",(req,res)=>{
    // res.sendFile(path.join(__dirname,"./client/build/index.html")),
     const index = path.join(__dirname,'client', 'build', 'index.html');
    //  console.log('index',index);
    res.sendFile(path.join(__dirname,'client', 'build', 'index.html')),
    function (err) {
        // console.log(err);
        res.status(500).send(err)
    }
})

//listen
let port = process.env.port || 8003;
app.listen(port, () => {
    console.log(`Listening to the port ${port}`)
})