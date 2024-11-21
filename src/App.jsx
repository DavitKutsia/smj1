import { useState } from 'react';
import './App.css';

function App() {
  const images = ['1.png', '2.png', '3.png', '4.png'];

  // State for the main image, secondary image, visibility of the modal, and count of items in cart
  const [mainImg, setMainImg] = useState(images[0]);
  const [secondImg, setSecondImg] = useState(images[0]);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(1);
  const [count1, setCount1] = useState(1);
  const [cartOpen, setCartOpen] = useState(false); // New state for cart visibility
  const [cart, setCart] = useState([]); // State for storing cart items

  // Handle adding to cart
  const handleAddCart = () => {
    const cartInfo = {
      id: 1,
      title: 'Fall Limited Edition Sneakers',
      price: 125,
      quantity: count1, // Use count1 for quantity
      total: 125 * count1, // Calculate total based on count1
    };

    // Add cartInfo to the cart (instead of overwriting)
    setCart([cartInfo]);
  };

  // Handle deleting an item from the cart
  const handleDelete = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  // Next image handler
  const nextHandler = () => {
    if (count >= images.length - 1) {
      setCount(0);
      setSecondImg(images[0]);
    } else {
      setCount(count + 1);
      setSecondImg(images[count + 1]);
    }
  };

  // Previous image handler
  const prevHandler = () => {
    if (count <= 0) {
      setCount(images.length - 1);
      setSecondImg(images[images.length - 1]);
    } else {
      setCount(count - 1);
      setSecondImg(images[count - 1]);
    }
  };

  return (
    <>
      <div>
        <header>
          <div className="headerDiv">
            <h1 className="sneakers">sneakers</h1>
            <div className="headerHeaderDiv">
              <span className="headerSpan">Collections</span>
              <span className="headerSpan">Men</span>
              <span className="headerSpan">Women</span>
              <span className="headerSpan">About</span>
              <span className="headerSpan">Contact</span>
            </div>
          </div>
          <div className="headerHeaderHeaderDiv">
            <button
              className="cart"
              onClick={() => setCartOpen(!cartOpen)} // Toggle cart visibility
            >
              <img src="/assets/cart.png" alt="" />
            </button>
            <img className="photo" src="/assets/profile.png" alt="" width={50}  />
          </div>

          {/* Cart Dropdown */}
          {cartOpen && (
            <div className="cartDropdown">
              <div className="cartDiv">
                <h2 className="cartH1">cart</h2>
              </div>
              {cart.length === 0 ? (
                <p style={{ marginTop: '50px' }}>Your cart is empty.</p>
              ) : (
                cart.map((el) => (
                  <div key={el.id}>                    
                    <div className='asset' >
                      <img src="/assets/4.png" alt="" width={50} style={{ borderRadius: '10px' }} />
                      <span className='shoeName'>{el.title}</span>
                      <span className='price1'>
                        {el.price} x {el.quantity}  <span className='price2'>${el.total}</span>
                      </span>
                      <button onClick={() => handleDelete(el.id)} className='delete'>
                        <img src="/assets/bin.png" alt="Delete" />
                      </button>
                    </div>
                    <button className='checkout'>Checkout</button>
                  </div>
                ))
              )}
            </div>
          )}
        </header>

        <div>
          <div className="productDiv">
            <div>
              <img
                onClick={() => {
                  setShow(true); // Open modal to view images
                }}
                src={`/assets/${mainImg}`}
                alt=""
                width={645}
              />
              <div className="imgDiv">
                {/* Render image thumbnails */}
                {images.map((el) => (
                  <img
                    onClick={() => {
                      setMainImg(el); // Change main image when thumbnail is clicked
                      setSecondImg(el);
                    }}
                    key={el}
                    src={`/assets/${el}`}
                    width={137.5}
                  />
                ))}
              </div>
            </div>

            <div className="textDiv">
              <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                <h3 className="sc">SNEAKER COMPANY</h3>
                <h1 className="name">Fall Limited Edition Sneakers</h1>
              </div>

              <span className="desc">
                These low-profile sneakers are your perfect casual wear <br />
                companion. Featuring a durable rubber outer sole, they'll <br />
                withstand everything the weather can offer
              </span>
              <div className="prices">
                <div className="discount">
                  <span className="half-price">$125.00</span>
                  <span className="procent">50%</span>
                </div>
                <span className="orPrice">$250.00</span>
              </div>

              <div className="buy">
                <div className="plusMinus">
                  {/* Decrease or increase item count */}
                  <button
                    className="addOrNo"
                    onClick={() => {
                      if (count1 <= 1) {
                        setCount1(1);
                      } else {
                        setCount1(count1 - 1);
                      }
                    }}
                  >
                    {' '}-{' '}
                  </button>
                  <span className="num">{count1}</span>
                  <button className="addOrNo" onClick={() => setCount1(count1 + 1)}>
                    {' '}+{' '}
                  </button>
                </div>

                <button className="addtoCart" onClick={handleAddCart}>
                  <img src="/assets/Shape.png" alt="" /> Add to cart
                </button>
              </div>
            </div>
          </div>

          {/* Modal for image preview */}
          {show && (
            <div className="modal">
              <button
                className="goBack"
                onClick={() => {
                  setShow(false); // Close modal
                }}
              >
                <img src="/assets/close.png" alt="" />
              </button>
              <div className="mainChange">
                <button className="changeImg">
                  <img onClick={prevHandler} src="/assets/left.png" alt="" width={40} />
                </button>
                <img src={`/assets/${secondImg}`} alt="" width={850} />
                <button className="changeImg">
                  <img onClick={nextHandler} src="/assets/right.png" alt="" width={40} />
                </button>
              </div>

              <div className="imgDiv" style={{ gap: '50px' }}>
                {/* Render image thumbnails for modal */}
                {images.map((el) => (
                  <img
                    onClick={() => {
                      setSecondImg(el); // Change image in modal when clicked
                    }}
                    key={el}
                    src={`/assets/${el}`}
                    width={175}
                  />
                ))}
              </div>

              <div className="modal2" onClick={() => setShow(false)}></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
