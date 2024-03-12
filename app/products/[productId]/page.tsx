import Padding from "@/components/layout/padding";
import ProductInfo from "@/components/products/ProductInfo";
import Recommendations from "@/components/products/Recommandations";

const page = () => {
  return (
    <Padding>
      <div className="grid gap-sm">
        <ProductInfo />
        <Recommendations />
      </div>
    </Padding>
  );
};

export default page;
