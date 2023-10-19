import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cart.action";
import Footer from "../Footer";
import Hearder from "../Header";
import Quantity from "../Quantity";
import "./style.css";
import { useParams } from "react-router";
import {
  detailItem,
  reviewItem,
  listItem,
} from "../../redux/actions/item.action";
import parse from "html-react-parser";
import ImageSlide from "./slideImage";
import { formatMoney } from "../../common/common";
import { Breadcrumbs, Link } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isEmpty } from "lodash";
import { showModelLogin } from "../../redux/actions/auth.action";
import StarRatting from "./commentProduct";
import ProductList from "../../components/ProductList";

const DetailProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const [change, setChange] = useState(false);
  const [user, setUser] = useState(null);
  const [rate, setRate] = useState(null);
  const [isReview, setIsview] = useState(false);
  const [valueInput, setValueInput] = useState("");
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.item);
  const productIsSame = useSelector((state) => state.item.items);

  const { id } = useParams();

  useEffect(() => {
    dispatch(
      detailItem(id, () => {
        dispatch(
          listItem({ isSame: productDetail?.item?.category?.id, limit: 8 })
        );
      })
    );
  }, [dispatch, id, isReview]);
  useEffect(() => {
    setUser(JSON.parse(localStorage?.getItem("user")));
  }, []);

  const handleQuantityChange = (newValue) => {
    if (newValue > productDetail?.item?.stockQuantity) {
      toast.error("vượt quá số lượng sản phẩm hiện có");
    } else if (newValue < 0) {
      toast.error("số lượng mua không hợp lệ");
    }
    setQuantity(newValue);
  };

  const handleAddToCartClick = () => {
    const params = {
      images: productDetail?.item?.itemImages[0],
      id: productDetail?.item?.id,
      price: productDetail?.item?.price,
      salePrice: productDetail?.item?.salePrice,
      quantity: quantity,
      stockQuanttity: productDetail?.item?.stockQuantity,
      name: productDetail?.item?.name,
    };
    if (
      params?.quantity < params?.stockQuanttity &&
      params?.quantity > 0 &&
      params?.quantity !== ""
    ) {
      dispatch(
        addToCart(params, () => {
          toast.success("Thêm vào giỏ hàng thành công");
          setChange(!change);
        })
      );
    } else if (params?.quantity > params?.stockQuanttity) {
      toast.error("vượt quá số lượng sản phẩm hiện có");
    } else {
      toast.error("số lượng sản phẩm không hợp lệ");
    }
  };
  const handleClick = () => {
    dispatch(showModelLogin());
  };
  const handleComment = () => {
    const params = {
      itemId: +id,
      rate: rate,
      content: valueInput,
    };
    dispatch(
      reviewItem(params, () => {
        setValueInput("");
        setIsview(!isReview);
      })
    );
  };
  const oneStart = productDetail?.item?.reviews?.filter(
    (e) => e?.rate === 1
  )?.length;
  const twoStart = productDetail?.item?.reviews?.filter(
    (e) => e?.rate === 2
  )?.length;
  const threeStart = productDetail?.item?.reviews?.filter(
    (e) => e?.rate === 3
  )?.length;
  const fourStart = productDetail?.item?.reviews?.filter(
    (e) => e?.rate === 4
  )?.length;
  const fiveStart = productDetail?.item?.reviews?.filter(
    (e) => e?.rate === 5
  )?.length;
  return (
    <>
      <Hearder change={change} />
      <ToastContainer />
      <div
        style={{
          paddingTop: "20px",
          paddingLeft: "62px",
        }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Trang chủ
          </Link>
          <Link underline="hover" color="inherit">
            {productDetail?.item?.category?.name}
          </Link>
          <Link underline="hover" color="inherit">
            {productDetail?.item?.name}
          </Link>
        </Breadcrumbs>
      </div>
      <div className="product_detail">
        <div className="product_left">
          <div style={{ paddingLeft: "68px" }}>
            <ImageSlide imageList={productDetail?.item?.itemImages} />
          </div>
        </div>
        <div className="product_right">
          <h2>{productDetail?.item?.name}</h2>
          <div className="review_header">
            <div className="star-header">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
            <p style={{ marginTop: "7px", marginLeft: "5px" }}>{`(${
              productDetail?.item?.reviews?.length || 0
            } đánh giá)`}</p>
          </div>
          <div className="branch">
            <div>Thương hiệu:</div>
            <span>{productDetail?.item?.branch?.name}</span>
          </div>
          <div className="prices">
            <div className="priceOld">
              {formatMoney(productDetail?.item?.price)}
            </div>
            {productDetail?.item?.salePrice > 0 ? (
              <div className="salePrice">
                {formatMoney(productDetail?.item?.salePrice)}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="status">
            <p>Trạng thái:</p>
            <span>
              {productDetail?.item?.stockQuantity > 0 ? "Còn hàng" : "Hết hàng"}
            </span>
          </div>
          <div className="cell">
            <div className="buy__quantity">
              <span>Số Lượng &nbsp;</span>
              <Quantity count={quantity} onChange={handleQuantityChange} />
            </div>
          </div>
          <div onClick={handleAddToCartClick} className="buy__btn">
            <i className="fas fa-shopping-cart"></i>
            <span>Chọn Mua</span>
          </div>
        </div>
        <div className="product_specification">
          <div
            style={{
              border: "1px solid #ebebeb",
              padding: "5px",
              borderRadius: "7px",
            }}
          >
            <h3>Thông tin sản phẩm</h3>
            {productDetail?.item?.specifications?.map((item) => (
              <div className="specification">
                <p className="specification_name">{item?.name}</p>
                <p className="specification_content">{item?.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="product_infor">
        <div className="product_description">
          <h3 style={{ marginBottom: "20px" }}>Mô tả sản phẩm</h3>
          <div>{parse(productDetail?.item?.description || "")}</div>
        </div>
      </div>
      <div className="product_infor">
        <div className="product_description">
          <h3 style={{ marginBottom: "20px" }}>Đánh giá sản phẩm</h3>
          <div className="header_review">
            <div className="review_left">
              <h3>5/5</h3>
              <div className="star-header">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <div>
                <p>{`${
                  productDetail?.item?.reviews?.length || 0
                } đánh giá & nhận`}</p>
              </div>
            </div>
            <div className="review_right">
              <div className="ha">
                1 <i class="fa-solid fa-star" style={{ color: "yellow" }}></i>
                <div className="hi">
                  <div className="he"></div>
                </div>
                <div
                  style={{ marginRight: "20px" }}
                >{`${oneStart} đánh giá`}</div>
              </div>
              <div className="ha">
                2 <i class="fa-solid fa-star" style={{ color: "yellow" }}></i>
                <div className="hi">
                  <div className="he"></div>
                </div>
                <div
                  style={{ marginRight: "20px" }}
                >{`${twoStart} đánh giá`}</div>
              </div>
              <div className="ha">
                3 <i class="fa-solid fa-star" style={{ color: "yellow" }}></i>
                <div className="hi">
                  <div className="he"></div>
                </div>
                <div
                  style={{ marginRight: "20px" }}
                >{`${threeStart} đánh giá`}</div>
              </div>
              <div className="ha">
                4 <i class="fa-solid fa-star" style={{ color: "yellow" }}></i>
                <div className="hi">
                  <div className="he"></div>
                </div>
                <div
                  style={{ marginRight: "20px" }}
                >{`${fourStart} đánh giá`}</div>
              </div>
              <div className="ha">
                5 <i class="fa-solid fa-star" style={{ color: "yellow" }}></i>
                <div className="hi">
                  <div className="he"></div>
                </div>
                <div
                  style={{ marginRight: "20px" }}
                >{`${fiveStart} đánh giá`}</div>
              </div>
            </div>
          </div>
          {isEmpty(user) ? (
            <div className="button_login" onClick={handleClick}>
              <button className="button">Đăng nhập để đánh giá</button>
            </div>
          ) : (
            <div className="comment">
              <input
                className="input-comment"
                placeholder="Viết bình luận của bạn..."
                value={valueInput}
                onChange={(e) => setValueInput(e.target.value)}
              ></input>
              <div className="star-review">
                <StarRatting setRate={setRate} rate={rate} />
              </div>
              <button className="button-comment" onClick={handleComment}>
                Đánh giá
              </button>
            </div>
          )}
          <div style={{ marginLeft: "15px" }}>
            {productDetail?.item?.reviews?.length > 0 ? (
              <h3 style={{ marginTop: "15px" }}>Đánh giá & bình luận </h3>
            ) : (
              ""
            )}
            {productDetail?.item?.reviews?.map((item) => (
              <>
                <div style={{ display: "flex" }}>
                  <h4 style={{ marginTop: "20px", marginRight: "10px" }}>
                    {item?.fullname}
                  </h4>
                  {[...Array(5)]?.map((star, i) => (
                    <i
                      class="fa-solid fa-star"
                      style={{
                        color: "yellow",
                        marginTop: "25px",
                      }}
                    ></i>
                  ))}
                </div>
                <p style={{ marginLeft: "10px" }}>{item?.content}</p>
              </>
            ))}
          </div>
        </div>
      </div>
      <div className="product_infor">
        <div className="product_description">
          <h2>Sản phẩm liên quan</h2>
          <ProductList data={productIsSame} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailProduct;
