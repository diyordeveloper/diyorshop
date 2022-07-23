import React, { createContext, useContext, useEffect, useState } from "react";

import { auth, db } from "./firebase.config";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
export const UserContext = createContext({});
export const useUserContext = () => {
  return useContext(UserContext);
};
export function Context({ children }) {
  const navigate = useNavigate();
  // Profildagi usernamelarni olib keladi
  function GetCurrentUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          db.collection("users")
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              setUser(snapshot.data());
            });
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }
  const user = GetCurrentUser();
  //   Uid
  function GetUserUid() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUid(user.uid);
        }
      });
    }, []);
    return uid;
  }
  const uid = GetUserUid();

  // hamma productlarni olib kelish
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const products = await db.collection("products").get();
    const productsArray = [];
    for (var snap of products.docs) {
      var data = snap.data();
      data.ID = snap.id;
      productsArray.push({
        ...data,
      });
      if (productsArray.length === products.docs.length) {
        setProducts(productsArray);
      }
    }
  };
  // Category
  const [categories, setCategories] = useState([]);
  const getCategory = async () => {
    const categories = await db.collection("category").get();
    const categoriesArray = [];
    for (var snap of categories.docs) {
      var data = snap.data();
      data.ID = snap.id;
      categoriesArray.push({
        ...data,
      });
      if (categoriesArray.length === categories.docs.length) {
        setCategories(categoriesArray);
      }
    }
  };
  // reklama bannerni olib kelish
  const [banner, setBanner] = useState([]);
  const getBanner = async () => {
    const banner = await db.collection("banner").get();
    const bannerArray = [];
    for (var snap of banner.docs) {
      var data = snap.data();
      data.ID = snap.id;
      bannerArray.push({
        ...data,
      });
      if (bannerArray.length === banner.docs.length) {
        setBanner(bannerArray);
      }
    }
  };
  useEffect(() => {
    getProducts();
    getBanner();
    getCategory();
  }, []);
  // Navbardagi savatchani length
  const [basketLen, setBasketLen] = useState(0);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("basket " + user.uid).onSnapshot((snapshot) => {
          const qty = snapshot.docs.length;
          setBasketLen(qty);
        });
      }
    });
  }, []);
  // Savatchadagilarni hammasini olib kelish
  const [basket, setBasket] = useState([]);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("basket " + user.uid).onSnapshot((snapshot) => {
          const newCartProduct = snapshot.docs.map((doc) => ({
            ID: doc.id,
            ...doc.data(),
          }));
          setBasket(newCartProduct);
        });
      } else {
        console.log("user is not signed in to retrieve cart");
      }
    });
  }, []);
  // Savatchaga qo'shish
  let Product;
  async function AddBasketBtn(itm) {
    const { title, price } = itm;
    if (uid !== null) {
      // const { name, phone, email, password } = user;
      Product = itm;
      Product["qty"] = 1;
      Product["TotalProductPrice"] = Product.qty * Product.price;
      // Product["name"] = name;
      // Product["phone"] = phone;
      // Product["email"] = email;
      // Product["password"] = password;
      db.collection("basket " + uid)
        .doc(itm.ID)
        .set(Product)
        .then(() => {
          console.log("successfully added to cart");
          toast.success(title + " $ " + price);
        });
    } else {
      navigate("/login");
      toast.warning("Not Entered !");
    }
  }

  // getting the qty from basket in a seperate array
  const qty = basket.map((cartProduct) => {
    return cartProduct.qty;
  });

  // Filter 
  const [active, setActive] = useState(""); 
  const [category, setCategory] = useState(''); 
  const CategoryFilters = (itm) => {
    setActive(itm.id);
    filterFunction(itm.category);
    setCategory(itm.category);
  }; 
  const [filteredProducts, setFilteredProducts] = useState([]);
  const filterFunction = (category) => {
    if (products.length > 1) {
      const filter = products.filter((itm) => itm.category === category);
      setFilteredProducts(filter);
    } else {
      console.log("no products to filter");
    }
  };
 
  // Filter
  const [search, setSearch] = useState("");
//  Range Filter
const MIN = 0;
const MAX = 1000000;
const [min, setMin] = useState(MIN);
const [max, setMax] = useState(MAX);
const [priceFilter, setPriceFilter] = useState([min, max]);

//  setMin( products.reduce((m, p) => (p.price < m ? p.price : m), Infinity));
//  setMax(products.reduce((m, p) => (p.price > m ? p.price : m), -Infinity));
 

     
//  Filter Clear
  const returntoAllProducts = () => {
    setActive(""); 
    setCategory('')
    setFilteredProducts([]);
    setSearch('')
  };
  // All Price
  const reducerOfQty = (accumulator, currentValue) =>
    accumulator + currentValue;
  const totalQty = qty.reduce(reducerOfQty, 0);
  const price = basket.map((cartProduct) => {
    return cartProduct.TotalProductPrice;
  });
  const reducerOfPrice = (accumulator, currentValue) =>
    accumulator + currentValue;
  const totalPrice = price.reduce(reducerOfPrice, 0);

  const AllFunction = {
    setPriceFilter,
    min,max,
    priceFilter,
    user,
    products,
    banner,
    basketLen,
    basket,
    categories,
    active,
    search,
    setSearch,
    category,
    totalQty,
    totalPrice,
    filteredProducts,
    CategoryFilters,
    returntoAllProducts,
    AddBasketBtn,
  };
  return (
    <UserContext.Provider value={AllFunction}>{children}</UserContext.Provider>
  );
}
