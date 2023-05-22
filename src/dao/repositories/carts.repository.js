import { cartModel } from "../models/carts.model.js";

class CartsRepository {
  constructor() {
    this.model = cartModel;
  }

  getCartById = async (cartId) => {
    try {
      const filteredCart = await this.model.findOne({ _id: cartId }).lean();
      return filteredCart;
    } catch (error) {
      console.log(error);
    }
  };

  createCart = async () => {
    try {
      const newCart = await this.model.create({
        products: [],
      });
      return newCart;
    } catch (error) {
      console.log(error);
    }
  };

  addToCart = async (cartId, productId, quantity) => {
    try {
      let cartFound = await this.model.findOne({ _id: cartId });

      const productIdInCart = cartFound.products.findIndex((product) => {
        return product.productId._id.toString() === productId;
      });

      if (productIdInCart !== -1) {
        await this.model.updateOne(
          { _id: cartId, "products.productId": productId },
          { $inc: { "products.$.quantity": 1 } }
        );
        const updatedCartWithProduct = await this.model.findOne({ _id: cartId });
        return updatedCartWithProduct;
      } else {
        const productAddToCart = {
          productId: productId,
          quantity: quantity ? quantity : 1,
        };
        await this.model.updateOne(
          { _id: cartId },
          { $push: { products: productAddToCart } }
        );
        const updatedCartWithProduct = await this.model.findOne({ _id: cartId });
        return updatedCartWithProduct;
      }
    } catch (error) {
      console.log(error);
    }
  };

  updateCart = async (cartId, products) => {
    try {
      const updatedCart = await this.model.updateOne(
        { _id: cartId },
        { products: products }
      );
      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  };

  updateProductFromCart = async (cartId, productId, quantity) => {
    try {
      const updatedCartProduct = await this.model.updateOne(
        { _id: cartId, "products.productId": productId },
        { "products.$.quantity": quantity }
      );
      return updatedCartProduct;
    } catch (error) {
      console.log(error);
    }
  };

  deleteCart = async (cartId) => {
    try {
      const deletedCart = await this.model.deleteOne({ _id: cartId });
      return deletedCart;
    } catch (error) {
      console.log(error);
    }
  };

  deleteProductFromCart = async (cartId, productId) => {
    try {
      const updatedCart = await this.model.updateOne(
        { _id: cartId },
        { $pull: { products: { productId: productId } } }
      );
      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  };

}

export const cartsRepository = new CartsRepository();
