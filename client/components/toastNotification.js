import React from "react";
import ReactNotification from "react-notifications-component";

class ToastAddedToCart extends React.Component {
  constructor(props) {
    super(props);
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }

  addNotification() {
    this.notificationDOMRef.current.addNotification({
      title: "Yay!",
      message: "Item added to cart!",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }

  render() {
    return (
      <div className="app-content">
        <ReactNotification ref={this.notificationDOMRef} />
        <button onClick={this.addNotification} className="btn btn-primary">
          Add To Cart
        </button>
      </div>
    );
  }
}

export default ToastAddedToCart;