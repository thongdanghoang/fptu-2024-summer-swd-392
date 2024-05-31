import React, {useEffect, useState} from 'react';
import ApplicationService from '../../shared/services/application.service.ts';
import {ProductDTO} from '../productDto.ts';
import AppButton from '../../shared/components/buttons/AppButton.tsx';
import './ProducList.scss';
import {ApplicationConstants} from '../../shared/application.constants.ts';
import ProductCard from '../product-card/ProductCard.tsx';

const ProductList = (): React.ReactElement => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const applicationService: ApplicationService =
    ApplicationService.getInstance();

  const fetchProducts = (): void => {
    setLoading(true);
    applicationService
      .createApiClient()
      .get(`${ApplicationConstants.API_URL}/products`)
      .then(response => {
        setProducts(
          response.data.data.map((product: ProductDTO) => ({
            ...product,
            image_url:
              'https://binhminhdigital.com/storedata/images/product/canon-eos-4000d-kit-1855mm-f3556-iii-den.jpg'
          }))
        );
        setLoading(false);
      })
      .catch(error => {
        console.error('API error:', error);
        setError('Failed to fetch products');
        setLoading(false);
      });
  };

  useEffect(() => {
    if (applicationService.isAuthenticated()) {
      fetchProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationService.isAuthenticated()]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (applicationService.isAuthenticated()) {
    return (
      <div className="container my-5 d-flex flex-column gap-5">
        <div className="products-list row g-3">
          <div className="bold-32">Tin đăng mới</div>
          {products.map((product: ProductDTO) => (
            <div className="col-3" key={product.id.toString()}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
        <div className="load-more d-flex justify-content-center">
          <AppButton style="primary" onClickFn={fetchProducts}>
            Xem Thêm
          </AppButton>
        </div>
      </div>
    );
  }

  return <div>Not logged in! Try to refresh to be redirected to Google.</div>;
};

export default ProductList;
