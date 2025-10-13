import { Model, ModelCtor } from "sequelize-typescript";
import { User } from "./core/user/user.model";
import { Brands } from "./apis/brands/brands.model";
import { Category } from "./apis/categories/categories.model";
import { UserRole } from "./core/auth/user-role/user-role.model";
import { Role } from "./core/auth/role/role.model";
import { Permission } from "./core/auth/permission/permission.model";
import { RolePermission } from "./core/auth/role-permission/role-permission.model";
import { SubCategory } from "./apis/sub-categories/sub-categories.model";
import { Product } from "./apis/product/product.model";
import { Cart } from "./apis/cart/cart.model";
import { Wishlist } from "./apis/wishlist/wishlist.model";
import { WishlistDetails } from "./apis/wishlist-details/wishlist-details.model";
import { CartDetails } from "./apis/cart-details/cart-details.model";
import { Order } from "./apis/order/order.model";
import { Comments } from "./apis/comments/comments.model";
import { Address } from "./apis/address/address.model";

export const MODELS: ModelCtor<Model<any, any>>[] = [
  // Define your models here
  User,
  Brands,
  Category,
  SubCategory,
  Product,
  // UserAppRolePermissions,
  UserRole,
  Role,
  Permission,
  RolePermission,
  Cart,
  CartDetails,
  Order,
  Comments,
  Address,
  Wishlist,
  WishlistDetails,
];
