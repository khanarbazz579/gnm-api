import { Module } from "@nestjs/common";
import { SharedModule } from "./shared/shared.module";
import { CronModule } from "src/common/cron/cron.module";
import { BrandsModule } from "src/apis/brands/brands.module";
import { CategoriesModule } from "src/apis/categories/categories.module";
import { SubCategoriesModule } from "./sub-categories/sub-categories.module";
import { AddressModule } from "./address/address.module";
import { CartModule } from "./cart/cart.module";
import { CartDetailsModule } from "./cart-details/cart-details.module";
import { ColorModule } from "./color/color.module";
import { CommentsModule } from "./comments/comments.module";
import { FileUploadModule } from "./file-upload/file-upload.module";
import { OrderModule } from "./order/order.module";
import { ProductVarientsModule } from "./product-varients/product-varients.module";
import { ProgressModule } from "./progress/progress.module";
import { WishlistModule } from "./wishlist/wishlist.module";
import { WishlistDetailsModule } from "./wishlist-details/wishlist-details.module";
import { ProductModule } from "./product/product.module";

@Module({
  imports: [
    SharedModule,
    CronModule,
    BrandsModule,
    CategoriesModule,
    SubCategoriesModule,
    ProductModule,
    AddressModule,
    CartModule,
    CartDetailsModule,
    ColorModule,
    CommentsModule,
    FileUploadModule,
    OrderModule,
    // PaymentGatewayModule,
    ProductVarientsModule,
    ProgressModule,
    // TransactionModule,
    WishlistModule,
    WishlistDetailsModule,
  ],
  providers: [],
  exports: [],
})
export class ApisModule {}
