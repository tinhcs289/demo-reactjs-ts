/** Generate by swagger-axios-codegen */
// @ts-nocheck
/* eslint-disable */

/** Generate by swagger-axios-codegen */
/* eslint-disable */
// @ts-nocheck
import axiosStatic, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface IRequestOptions extends AxiosRequestConfig {
  /** only in axios interceptor config*/
  loading?: boolean;
  showError?: boolean;
}

export interface IRequestConfig {
  method?: any;
  headers?: any;
  url?: any;
  data?: any;
  params?: any;
}

// Add options interface
export interface ServiceOptions {
  axios?: AxiosInstance;
  /** only in axios interceptor config*/
  loading: boolean;
  showError: boolean;
}

// Add default options
export const serviceOptions: ServiceOptions = {};

// Instance selector
export function axios(configs: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void): Promise<any> {
  if (serviceOptions.axios) {
    return serviceOptions.axios
      .request(configs)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  } else {
    throw new Error('please inject yourself instance like axios  ');
  }
}

export function getConfigs(method: string, contentType: string, url: string, options: any): IRequestConfig {
  const configs: IRequestConfig = {
    loading: serviceOptions.loading,
    showError: serviceOptions.showError,
    ...options,
    method,
    url
  };
  configs.headers = {
    ...options.headers,
    'Content-Type': contentType
  };
  return configs;
}

export const basePath = '';

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[];
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResultDto<T = any> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

// customer definition
// empty

export class AccommodationService {
  /**
   *
   */
  static otherServicesPriceWithOption(
    params: {
      /** requestBody */
      body?: OtherServicesPriceOptionRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/otherServicesPriceWithOption';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static otherServicesPrice(
    params: {
      /** requestBody */
      body?: OtherServicesPriceCreateRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/otherServicesPrice';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static otherServicesPrice1(
    params: {
      /** requestBody */
      body?: OtherServicesPriceUpdateRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/otherServicesPrice';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static otherServicesPrice2(
    params: {
      /**  */
      id?: number;
      /**  */
      acdId?: number;
      /**  */
      supplierId?: string;
      /**  */
      customerGroupId?: string;
      /**  */
      representWorkgroupId?: string;
      /**  */
      buyOrSell?: number;
      /**  */
      workgroupId?: string;
      /**  */
      viewerId?: string;
      /**  */
      createdBy?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/otherServicesPrice';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);
      configs.params = {
        Id: params['id'],
        AcdId: params['acdId'],
        SupplierId: params['supplierId'],
        CustomerGroupId: params['customerGroupId'],
        RepresentWorkgroupId: params['representWorkgroupId'],
        BuyOrSell: params['buyOrSell'],
        WorkgroupId: params['workgroupId'],
        ViewerId: params['viewerId'],
        CreatedBy: params['createdBy']
      };

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static otherServicesPrice3(
    params: {
      /**  */
      acdId?: number;
      /**  */
      supplierId?: string;
      /**  */
      customerGroupId?: string;
      /**  */
      representWorkgroupId?: string;
      /**  */
      buyOrSell?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/otherServicesPrice';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        AcdId: params['acdId'],
        SupplierId: params['supplierId'],
        CustomerGroupId: params['customerGroupId'],
        RepresentWorkgroupId: params['representWorkgroupId'],
        BuyOrSell: params['buyOrSell']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static otherServices(
    params: {
      /**  */
      acdId?: number;
      /**  */
      isPublic?: boolean;
      /**  */
      supplierId?: string;
      /**  */
      customerGroupId?: string;
      /**  */
      representWorkgroupId?: string;
      /**  */
      buyOrSell?: number;
      /**  */
      workgroupId?: string;
      /**  */
      viewerId?: string;
      /**  */
      createdBy?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/otherServices';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        AcdId: params['acdId'],
        IsPublic: params['isPublic'],
        SupplierId: params['supplierId'],
        CustomerGroupId: params['customerGroupId'],
        RepresentWorkgroupId: params['representWorkgroupId'],
        BuyOrSell: params['buyOrSell'],
        WorkgroupId: params['workgroupId'],
        ViewerId: params['viewerId'],
        CreatedBy: params['createdBy']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static otherServices1(
    params: {
      /** requestBody */
      body?: OtherServicesCreateRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/otherServices';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static otherServices2(
    params: {
      /** requestBody */
      body?: OtherServicesUpdateRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/otherServices';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static otherServices3(
    params: {
      /**  */
      id?: number;
      /**  */
      acdId?: number;
      /**  */
      productId?: string;
      /**  */
      supplierId?: string;
      /**  */
      customerGroupId?: string;
      /**  */
      representWorkgroupId?: string;
      /**  */
      buyOrSell?: number;
      /**  */
      workgroupId?: string;
      /**  */
      viewerId?: string;
      /**  */
      createdBy?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/otherServices';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);
      configs.params = {
        Id: params['id'],
        AcdId: params['acdId'],
        ProductId: params['productId'],
        SupplierId: params['supplierId'],
        CustomerGroupId: params['customerGroupId'],
        RepresentWorkgroupId: params['representWorkgroupId'],
        BuyOrSell: params['buyOrSell'],
        WorkgroupId: params['workgroupId'],
        ViewerId: params['viewerId'],
        CreatedBy: params['createdBy']
      };

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static priceClass(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/priceClass';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static priceClassInPrice(
    params: {
      /**  */
      acdId?: number;
      /**  */
      workgroupId?: string;
      /**  */
      representWorkgroupId?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/priceClassInPrice';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        AcdId: params['acdId'],
        WorkgroupId: params['workgroupId'],
        RepresentWorkgroupId: params['representWorkgroupId']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static cities(
    params: {
      /**  */
      countryCode?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/cities';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { countryCode: params['countryCode'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static bedTypes(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/bedTypes';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static suppliers(
    params: {
      /**  */
      acdId?: number;
      /**  */
      workgroupId?: string;
      /**  */
      representWorkgroupId?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/suppliers';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        AcdId: params['acdId'],
        WorkgroupId: params['workgroupId'],
        RepresentWorkgroupId: params['representWorkgroupId']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static customers(
    params: {
      /**  */
      acdId?: number;
      /**  */
      workgroupId?: string;
      /**  */
      representWorkgroupId?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/customers';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        AcdId: params['acdId'],
        WorkgroupId: params['workgroupId'],
        RepresentWorkgroupId: params['representWorkgroupId']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static policy(
    params: {
      /** requestBody */
      body?: PolicyCreateRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/policy';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static policy1(
    params: {
      /** requestBody */
      body?: PolicyCreateRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/policy';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static policy2(
    params: {
      /**  */
      id?: number;
      /**  */
      acdId?: number;
      /**  */
      supplierId?: string;
      /**  */
      customerGroupId?: string;
      /**  */
      representWorkgroupId?: string;
      /**  */
      buyOrSell?: number;
      /**  */
      workgroupId?: string;
      /**  */
      viewerId?: string;
      /**  */
      createdBy?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/policy';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);
      configs.params = {
        Id: params['id'],
        AcdId: params['acdId'],
        SupplierId: params['supplierId'],
        CustomerGroupId: params['customerGroupId'],
        RepresentWorkgroupId: params['representWorkgroupId'],
        BuyOrSell: params['buyOrSell'],
        WorkgroupId: params['workgroupId'],
        ViewerId: params['viewerId'],
        CreatedBy: params['createdBy']
      };

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static validateDaterange(
    params: {
      /** requestBody */
      body?: DateRange[];
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/validateDaterange';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static cancellationPolicies(
    params: {
      /**  */
      acdId?: number;
      /**  */
      supplierId?: string;
      /**  */
      customerGroupId?: string;
      /**  */
      representWorkgroupId?: string;
      /**  */
      buyOrSell?: number;
      /**  */
      workgroupId?: string;
      /**  */
      viewerId?: string;
      /**  */
      createdBy?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/cancellationPolicies';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        AcdId: params['acdId'],
        SupplierId: params['supplierId'],
        CustomerGroupId: params['customerGroupId'],
        RepresentWorkgroupId: params['representWorkgroupId'],
        BuyOrSell: params['buyOrSell'],
        WorkgroupId: params['workgroupId'],
        ViewerId: params['viewerId'],
        CreatedBy: params['createdBy']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static policiesBySupplierIds(
    params: {
      /** requestBody */
      body?: PolicySupplierRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/policiesBySupplierIds';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static policies(
    params: {
      /** requestBody */
      body?: PolicyCreateRequest[];
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/policies';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static policies1(
    params: {
      /** requestBody */
      body?: PolicyUpdateRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/policies';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static deletePolicies(
    params: {
      /** requestBody */
      body?: PoliciesDeleteRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/deletePolicies';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static policyGroup(
    params: {
      /** requestBody */
      body?: PolicyGroupRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/policyGroup';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static policyGroup1(
    params: {
      /** requestBody */
      body?: PolicyGroupRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/policyGroup';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static policyGroup2(
    params: {
      /**  */
      id?: number;
      /**  */
      name?: string;
      /**  */
      acdId?: number;
      /**  */
      policyGroupId?: number;
      /**  */
      supplierId?: string;
      /**  */
      customerGroupId?: string;
      /**  */
      representWorkgroupId?: string;
      /**  */
      buyOrSell?: number;
      /**  */
      workgroupId?: string;
      /**  */
      viewerId?: string;
      /**  */
      createdBy?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/policyGroup';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);
      configs.params = {
        Id: params['id'],
        Name: params['name'],
        AcdId: params['acdId'],
        PolicyGroupId: params['policyGroupId'],
        SupplierId: params['supplierId'],
        CustomerGroupId: params['customerGroupId'],
        RepresentWorkgroupId: params['representWorkgroupId'],
        BuyOrSell: params['buyOrSell'],
        WorkgroupId: params['workgroupId'],
        ViewerId: params['viewerId'],
        CreatedBy: params['createdBy']
      };

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static description(
    params: {
      /** requestBody */
      body?: AcdRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/description';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static categoryDescription(
    params: {
      /** requestBody */
      body?: AcdRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/categoryDescription';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static images(
    params: {
      /** requestBody */
      body?: ImageInsertRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/images';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static images1(
    params: {
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/images/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static categoryProducts(
    params: {
      /**  */
      keyword?: string;
      /**  */
      starRating?: number;
      /**  */
      languageCode?: string;
      /**  */
      status?: number;
      /**  */
      workgroupId?: string;
      /**  */
      viewerId?: string;
      /**  */
      cityCode?: string;
      /**  */
      countryCode?: string;
      /**  */
      pageSize?: number;
      /**  */
      pageIndex?: number;
      /**  */
      orderBy?: string;
      /**  */
      orderByDesc?: boolean;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/categoryProducts';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        Keyword: params['keyword'],
        StarRating: params['starRating'],
        LanguageCode: params['languageCode'],
        Status: params['status'],
        WorkgroupId: params['workgroupId'],
        ViewerId: params['viewerId'],
        CityCode: params['cityCode'],
        CountryCode: params['countryCode'],
        PageSize: params['pageSize'],
        PageIndex: params['pageIndex'],
        OrderBy: params['orderBy'],
        OrderByDesc: params['orderByDesc']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static rooms(
    params: {
      /**  */
      keyword?: string;
      /**  */
      workgroupId?: string;
      /**  */
      cityCode?: string;
      /**  */
      pageSize?: number;
      /**  */
      pageIndex?: number;
      /**  */
      orderBy?: string;
      /**  */
      orderByDesc?: boolean;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/categoryProducts/rooms';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        Keyword: params['keyword'],
        WorkgroupId: params['workgroupId'],
        CityCode: params['cityCode'],
        PageSize: params['pageSize'],
        PageIndex: params['pageIndex'],
        OrderBy: params['orderBy'],
        OrderByDesc: params['orderByDesc']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static categoryProduct(
    params: {
      /** requestBody */
      body?: AcdUpdateRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/categoryProduct';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static categoryProduct1(
    params: {
      /** requestBody */
      body?: AcdUpdateRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/categoryProduct';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static categoryProduct2(
    params: {
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/categoryProduct/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static categoryProduct3(
    params: {
      /**  */
      acdId?: number;
      /**  */
      contentType?: string;
      /**  */
      isInternal?: boolean;
      /**  */
      isApproved?: boolean;
      /**  */
      isPublic?: boolean;
      /**  */
      isCategory?: boolean;
      /**  */
      supplierId?: string;
      /**  */
      customerGroupId?: string;
      /**  */
      representWorkgroupId?: string;
      /**  */
      buyOrSell?: number;
      /**  */
      workgroupId?: string;
      /**  */
      viewerId?: string;
      /**  */
      createdBy?: number;
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/categoryProduct/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        AcdId: params['acdId'],
        ContentType: params['contentType'],
        IsInternal: params['isInternal'],
        IsApproved: params['isApproved'],
        IsPublic: params['isPublic'],
        IsCategory: params['isCategory'],
        SupplierId: params['supplierId'],
        CustomerGroupId: params['customerGroupId'],
        RepresentWorkgroupId: params['representWorkgroupId'],
        BuyOrSell: params['buyOrSell'],
        WorkgroupId: params['workgroupId'],
        ViewerId: params['viewerId'],
        CreatedBy: params['createdBy']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static publishCategoryProduct(
    params: {
      /** requestBody */
      body?: AcdPublishRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/publishCategoryProduct';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static products(
    params: {
      /**  */
      keyword?: string;
      /**  */
      starRating?: number;
      /**  */
      languageCode?: string;
      /**  */
      status?: number;
      /**  */
      workgroupId?: string;
      /**  */
      viewerId?: string;
      /**  */
      cityCode?: string;
      /**  */
      countryCode?: string;
      /**  */
      pageSize?: number;
      /**  */
      pageIndex?: number;
      /**  */
      orderBy?: string;
      /**  */
      orderByDesc?: boolean;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/products';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        Keyword: params['keyword'],
        StarRating: params['starRating'],
        LanguageCode: params['languageCode'],
        Status: params['status'],
        WorkgroupId: params['workgroupId'],
        ViewerId: params['viewerId'],
        CityCode: params['cityCode'],
        CountryCode: params['countryCode'],
        PageSize: params['pageSize'],
        PageIndex: params['pageIndex'],
        OrderBy: params['orderBy'],
        OrderByDesc: params['orderByDesc']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static product(
    params: {
      /** requestBody */
      body?: AcdUpdateRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/product';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static product1(
    params: {
      /** requestBody */
      body?: AcdUpdateRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/product';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static product2(
    params: {
      /**  */
      acdId?: number;
      /**  */
      workgroupId?: string;
      /**  */
      representWorkgroupId?: string;
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/product/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);
      configs.params = {
        AcdId: params['acdId'],
        WorkgroupId: params['workgroupId'],
        RepresentWorkgroupId: params['representWorkgroupId']
      };

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static product3(
    params: {
      /**  */
      acdId?: number;
      /**  */
      contentType?: string;
      /**  */
      isInternal?: boolean;
      /**  */
      isApproved?: boolean;
      /**  */
      isPublic?: boolean;
      /**  */
      isCategory?: boolean;
      /**  */
      supplierId?: string;
      /**  */
      customerGroupId?: string;
      /**  */
      representWorkgroupId?: string;
      /**  */
      buyOrSell?: number;
      /**  */
      workgroupId?: string;
      /**  */
      viewerId?: string;
      /**  */
      createdBy?: number;
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/product/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        AcdId: params['acdId'],
        ContentType: params['contentType'],
        IsInternal: params['isInternal'],
        IsApproved: params['isApproved'],
        IsPublic: params['isPublic'],
        IsCategory: params['isCategory'],
        SupplierId: params['supplierId'],
        CustomerGroupId: params['customerGroupId'],
        RepresentWorkgroupId: params['representWorkgroupId'],
        BuyOrSell: params['buyOrSell'],
        WorkgroupId: params['workgroupId'],
        ViewerId: params['viewerId'],
        CreatedBy: params['createdBy']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static productByProductId(
    params: {
      /**  */
      productId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/productByProductId/{productId}';
      url = url.replace('{productId}', params['productId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static activeProduct(
    params: {
      /** requestBody */
      body?: AcdPublishRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/activeProduct';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static deactiveProduct(
    params: {
      /** requestBody */
      body?: AcdPublishRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/deactiveProduct';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static activeProductByProductId(
    params: {
      /**  */
      productId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/activeProductByProductId/{productId}';
      url = url.replace('{productId}', params['productId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static deactiveProductByProductId(
    params: {
      /**  */
      productId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/deactiveProductByProductId/{productId}';
      url = url.replace('{productId}', params['productId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static generate(
    params: {
      /** requestBody */
      body?: AcdProductGenerateRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/generate';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static unpublish(
    params: {
      /** requestBody */
      body?: AcdProductGenerateRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/unpublish';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static checkProductPrice(
    params: {
      /** requestBody */
      body?: CheckProductPriceRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/checkProductPrice';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static search(
    params: {
      /** requestBody */
      body?: RoomSearchRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/product/search';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getSuppliers(
    params: {
      /** requestBody */
      body?: RoomSearchSupplierRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/product/search/getSuppliers';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static searchBySessionId(
    params: {
      /**  */
      sessionIdSearch?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/product/searchBySessionId';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { sessionIdSearch: params['sessionIdSearch'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static roomrates(
    params: {
      /**  */
      acdId?: number;
      /**  */
      priceClassId?: number;
      /**  */
      isPublic?: boolean;
      /**  */
      supplierId?: string;
      /**  */
      customerGroupId?: string;
      /**  */
      representWorkgroupId?: string;
      /**  */
      buyOrSell?: number;
      /**  */
      workgroupId?: string;
      /**  */
      viewerId?: string;
      /**  */
      createdBy?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/roomrates';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        AcdId: params['acdId'],
        PriceClassId: params['priceClassId'],
        IsPublic: params['isPublic'],
        SupplierId: params['supplierId'],
        CustomerGroupId: params['customerGroupId'],
        RepresentWorkgroupId: params['representWorkgroupId'],
        BuyOrSell: params['buyOrSell'],
        WorkgroupId: params['workgroupId'],
        ViewerId: params['viewerId'],
        CreatedBy: params['createdBy']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static roomratesWithOption(
    params: {
      /** requestBody */
      body?: AcdProductRoomratesOptionRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/roomratesWithOption';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static amenities(
    params: {
      /** requestBody */
      body?: AmenitiesRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/amenities';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static amenities1(
    params: {
      /** requestBody */
      body?: AmenitiesRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/amenities';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static amenities2(
    params: {
      /**  */
      id?: number;
      /**  */
      parentId?: number;
      /**  */
      parentType?: number;
      /**  */
      workgroupId?: string;
      /**  */
      representWorkgroupId?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/amenities';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);
      configs.params = {
        Id: params['id'],
        ParentId: params['parentId'],
        ParentType: params['parentType'],
        WorkgroupId: params['workgroupId'],
        RepresentWorkgroupId: params['representWorkgroupId']
      };

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static categories(
    params: {
      /**  */
      acdId?: number;
      /**  */
      contentType?: string;
      /**  */
      isInternal?: boolean;
      /**  */
      isApproved?: boolean;
      /**  */
      isPublic?: boolean;
      /**  */
      isCategory?: boolean;
      /**  */
      supplierId?: string;
      /**  */
      customerGroupId?: string;
      /**  */
      representWorkgroupId?: string;
      /**  */
      buyOrSell?: number;
      /**  */
      workgroupId?: string;
      /**  */
      viewerId?: string;
      /**  */
      createdBy?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/amenities/categories';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        AcdId: params['acdId'],
        ContentType: params['contentType'],
        IsInternal: params['isInternal'],
        IsApproved: params['isApproved'],
        IsPublic: params['isPublic'],
        IsCategory: params['isCategory'],
        SupplierId: params['supplierId'],
        CustomerGroupId: params['customerGroupId'],
        RepresentWorkgroupId: params['representWorkgroupId'],
        BuyOrSell: params['buyOrSell'],
        WorkgroupId: params['workgroupId'],
        ViewerId: params['viewerId'],
        CreatedBy: params['createdBy']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static categories1(
    params: {
      /** requestBody */
      body?: AmenitiesCateRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/amenities/categories';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static categories2(
    params: {
      /** requestBody */
      body?: AmenitiesCateRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/amenities/categories';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static categories3(
    params: {
      /**  */
      id?: number;
      /**  */
      acdId?: number;
      /**  */
      representWorkgroupId?: string;
      /**  */
      workgroupId?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/amenities/categories';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);
      configs.params = {
        Id: params['id'],
        AcdId: params['acdId'],
        RepresentWorkgroupId: params['representWorkgroupId'],
        WorkgroupId: params['workgroupId']
      };

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static listAmenities(
    params: {
      /** requestBody */
      body?: AmenitiesRequest[];
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/listAmenities';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static listAmenities1(
    params: {
      /** requestBody */
      body?: AmenitiesUpdateRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/listAmenities';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static listAmenities2(
    params: {
      /** requestBody */
      body?: ListAmenitiesDeleteRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/listAmenities';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static promotions(
    params: {
      /**  */
      acdId?: number;
      /**  */
      isPublic?: boolean;
      /**  */
      supplierId?: string;
      /**  */
      customerGroupId?: string;
      /**  */
      representWorkgroupId?: string;
      /**  */
      buyOrSell?: number;
      /**  */
      workgroupId?: string;
      /**  */
      viewerId?: string;
      /**  */
      createdBy?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/promotions';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        AcdId: params['acdId'],
        IsPublic: params['isPublic'],
        SupplierId: params['supplierId'],
        CustomerGroupId: params['customerGroupId'],
        RepresentWorkgroupId: params['representWorkgroupId'],
        BuyOrSell: params['buyOrSell'],
        WorkgroupId: params['workgroupId'],
        ViewerId: params['viewerId'],
        CreatedBy: params['createdBy']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static combinedPromotions(
    params: {
      /**  */
      acdId?: number;
      /**  */
      startDate?: string;
      /**  */
      endDate?: string;
      /**  */
      promotionType?: number;
      /**  */
      priceClassId?: number;
      /**  */
      supplierId?: string;
      /**  */
      customerGroupId?: string;
      /**  */
      representWorkgroupId?: string;
      /**  */
      buyOrSell?: number;
      /**  */
      workgroupId?: string;
      /**  */
      viewerId?: string;
      /**  */
      createdBy?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/combinedPromotions';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        AcdId: params['acdId'],
        StartDate: params['startDate'],
        EndDate: params['endDate'],
        PromotionType: params['promotionType'],
        PriceClassId: params['priceClassId'],
        SupplierId: params['supplierId'],
        CustomerGroupId: params['customerGroupId'],
        RepresentWorkgroupId: params['representWorkgroupId'],
        BuyOrSell: params['buyOrSell'],
        WorkgroupId: params['workgroupId'],
        ViewerId: params['viewerId'],
        CreatedBy: params['createdBy']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static promotion(
    params: {
      /** requestBody */
      body?: PromotionCreateRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/promotion';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static promotion1(
    params: {
      /** requestBody */
      body?: PromotionCreateRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/promotion';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static promotion2(
    params: {
      /**  */
      id?: number;
      /**  */
      acdId?: number;
      /**  */
      supplierId?: string;
      /**  */
      customerGroupId?: string;
      /**  */
      representWorkgroupId?: string;
      /**  */
      buyOrSell?: number;
      /**  */
      workgroupId?: string;
      /**  */
      viewerId?: string;
      /**  */
      createdBy?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/promotion';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);
      configs.params = {
        Id: params['id'],
        AcdId: params['acdId'],
        SupplierId: params['supplierId'],
        CustomerGroupId: params['customerGroupId'],
        RepresentWorkgroupId: params['representWorkgroupId'],
        BuyOrSell: params['buyOrSell'],
        WorkgroupId: params['workgroupId'],
        ViewerId: params['viewerId'],
        CreatedBy: params['createdBy']
      };

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static supplements(
    params: {
      /**  */
      acdId?: number;
      /**  */
      isPublic?: boolean;
      /**  */
      priceClassId?: number;
      /**  */
      supplierId?: string;
      /**  */
      customerGroupId?: string;
      /**  */
      representWorkgroupId?: string;
      /**  */
      buyOrSell?: number;
      /**  */
      workgroupId?: string;
      /**  */
      viewerId?: string;
      /**  */
      createdBy?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/supplements';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        AcdId: params['acdId'],
        IsPublic: params['isPublic'],
        PriceClassId: params['priceClassId'],
        SupplierId: params['supplierId'],
        CustomerGroupId: params['customerGroupId'],
        RepresentWorkgroupId: params['representWorkgroupId'],
        BuyOrSell: params['buyOrSell'],
        WorkgroupId: params['workgroupId'],
        ViewerId: params['viewerId'],
        CreatedBy: params['createdBy']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static supplements1(
    params: {
      /** requestBody */
      body?: SupplementCreateRequest[];
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/supplements';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static supplements2(
    params: {
      /** requestBody */
      body?: UpdateSupplementsRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/supplements';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static supplementGroups(
    params: {
      /**  */
      acdId?: number;
      /**  */
      isPublic?: boolean;
      /**  */
      priceClassId?: number;
      /**  */
      supplierId?: string;
      /**  */
      customerGroupId?: string;
      /**  */
      representWorkgroupId?: string;
      /**  */
      buyOrSell?: number;
      /**  */
      workgroupId?: string;
      /**  */
      viewerId?: string;
      /**  */
      createdBy?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/supplementGroups';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        AcdId: params['acdId'],
        IsPublic: params['isPublic'],
        PriceClassId: params['priceClassId'],
        SupplierId: params['supplierId'],
        CustomerGroupId: params['customerGroupId'],
        RepresentWorkgroupId: params['representWorkgroupId'],
        BuyOrSell: params['buyOrSell'],
        WorkgroupId: params['workgroupId'],
        ViewerId: params['viewerId'],
        CreatedBy: params['createdBy']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static supplement(
    params: {
      /** requestBody */
      body?: SupplementCreateRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/supplement';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static supplement1(
    params: {
      /** requestBody */
      body?: SupplementCreateRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/supplement';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static supplement2(
    params: {
      /**  */
      id?: number;
      /**  */
      acdId?: number;
      /**  */
      workgroupId?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/supplement';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);
      configs.params = { Id: params['id'], AcdId: params['acdId'], WorkgroupId: params['workgroupId'] };

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static deleteSupplements(
    params: {
      /** requestBody */
      body?: SupplementsDeleteRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/deleteSupplements';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static categories4(
    params: {
      /**  */
      acdId?: number;
      /**  */
      isPublic?: boolean;
      /**  */
      priceClassId?: number;
      /**  */
      supplierId?: string;
      /**  */
      customerGroupId?: string;
      /**  */
      representWorkgroupId?: string;
      /**  */
      buyOrSell?: number;
      /**  */
      workgroupId?: string;
      /**  */
      viewerId?: string;
      /**  */
      createdBy?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/supplement/categories';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        AcdId: params['acdId'],
        IsPublic: params['isPublic'],
        PriceClassId: params['priceClassId'],
        SupplierId: params['supplierId'],
        CustomerGroupId: params['customerGroupId'],
        RepresentWorkgroupId: params['representWorkgroupId'],
        BuyOrSell: params['buyOrSell'],
        WorkgroupId: params['workgroupId'],
        ViewerId: params['viewerId'],
        CreatedBy: params['createdBy']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static categories5(
    params: {
      /** requestBody */
      body?: SupplementCategoryRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/supplement/categories';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static categories6(
    params: {
      /** requestBody */
      body?: SupplementCategoryRequest[];
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/supplement/categories';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static categories7(
    params: {
      /**  */
      id?: number;
      /**  */
      acdId?: number;
      /**  */
      workgroupId?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/supplement/categories';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);
      configs.params = { Id: params['id'], AcdId: params['acdId'], WorkgroupId: params['workgroupId'] };

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static acdSupplements(
    params: {
      /**  */
      acdId?: number;
      /**  */
      isPublic?: boolean;
      /**  */
      priceClassId?: number;
      /**  */
      supplierId?: string;
      /**  */
      customerGroupId?: string;
      /**  */
      representWorkgroupId?: string;
      /**  */
      buyOrSell?: number;
      /**  */
      workgroupId?: string;
      /**  */
      viewerId?: string;
      /**  */
      createdBy?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/acdSupplements';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        AcdId: params['acdId'],
        IsPublic: params['isPublic'],
        PriceClassId: params['priceClassId'],
        SupplierId: params['supplierId'],
        CustomerGroupId: params['customerGroupId'],
        RepresentWorkgroupId: params['representWorkgroupId'],
        BuyOrSell: params['buyOrSell'],
        WorkgroupId: params['workgroupId'],
        ViewerId: params['viewerId'],
        CreatedBy: params['createdBy']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static acdSupplementGroups(
    params: {
      /**  */
      acdId?: number;
      /**  */
      isPublic?: boolean;
      /**  */
      priceClassId?: number;
      /**  */
      supplierId?: string;
      /**  */
      customerGroupId?: string;
      /**  */
      representWorkgroupId?: string;
      /**  */
      buyOrSell?: number;
      /**  */
      workgroupId?: string;
      /**  */
      viewerId?: string;
      /**  */
      createdBy?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/acdSupplementGroups';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        AcdId: params['acdId'],
        IsPublic: params['isPublic'],
        PriceClassId: params['priceClassId'],
        SupplierId: params['supplierId'],
        CustomerGroupId: params['customerGroupId'],
        RepresentWorkgroupId: params['representWorkgroupId'],
        BuyOrSell: params['buyOrSell'],
        WorkgroupId: params['workgroupId'],
        ViewerId: params['viewerId'],
        CreatedBy: params['createdBy']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static acdSupplement(
    params: {
      /** requestBody */
      body?: AcdSupplementCreateRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/acdSupplement';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static acdSupplement1(
    params: {
      /** requestBody */
      body?: AcdSupplementCreateRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/acdSupplement';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static acdSupplement2(
    params: {
      /**  */
      id?: number;
      /**  */
      acdId?: number;
      /**  */
      supplierId?: string;
      /**  */
      customerGroupId?: string;
      /**  */
      representWorkgroupId?: string;
      /**  */
      buyOrSell?: number;
      /**  */
      workgroupId?: string;
      /**  */
      viewerId?: string;
      /**  */
      createdBy?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/acdSupplement';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);
      configs.params = {
        Id: params['id'],
        AcdId: params['acdId'],
        SupplierId: params['supplierId'],
        CustomerGroupId: params['customerGroupId'],
        RepresentWorkgroupId: params['representWorkgroupId'],
        BuyOrSell: params['buyOrSell'],
        WorkgroupId: params['workgroupId'],
        ViewerId: params['viewerId'],
        CreatedBy: params['createdBy']
      };

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static deleteAcdSupplements(
    params: {
      /** requestBody */
      body?: AcdSupplementsDeleteRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/deleteAcdSupplements';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static acdSupplementGroupWithOption(
    params: {
      /** requestBody */
      body?: AcdSupplementOptionRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/acdSupplementGroupWithOption';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static roomclasses(
    params: {
      /**  */
      acdId?: number;
      /**  */
      representWorkgroupId?: string;
      /**  */
      workgroupId?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/roomclasses';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        AcdId: params['acdId'],
        RepresentWorkgroupId: params['representWorkgroupId'],
        WorkgroupId: params['workgroupId']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static currency(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/currency';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static pricingMethod(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/pricingMethod';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static otherServicesPrices(
    params: {
      /** requestBody */
      body?: OtherServicesPriceCreateRequest[];
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/otherServicesPrices';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static otherServicesPrices1(
    params: {
      /** requestBody */
      body?: OtherServicesPriceUpdateRequest[];
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/otherServicesPrices';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static deleteOtherServicesPrices(
    params: {
      /** requestBody */
      body?: OtherServicesPriceDeleteRequest[];
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Accommodation/deleteOtherServicesPrices';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class BookingService {
  /**
   *
   */
  static contacts(
    params: {
      /**  */
      orderId?: string;
      /**  */
      workgroupId?: string;
      /**  */
      createdBy?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Booking/contacts';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        OrderId: params['orderId'],
        WorkgroupId: params['workgroupId'],
        CreatedBy: params['createdBy']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static contact(
    params: {
      /** requestBody */
      body?: BookingContactCreateRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Booking/contact';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static contact1(
    params: {
      /** requestBody */
      body?: BookingContactUpdateRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Booking/contact';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static contact2(
    params: {
      /**  */
      id?: number;
      /**  */
      orderId?: string;
      /**  */
      workgroupId?: string;
      /**  */
      deletedBy?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Booking/contact';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);
      configs.params = {
        Id: params['id'],
        OrderId: params['orderId'],
        WorkgroupId: params['workgroupId'],
        DeletedBy: params['deletedBy']
      };

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static customers(
    params: {
      /**  */
      orderId?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Booking/customers';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { OrderId: params['orderId'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static customer(
    params: {
      /** requestBody */
      body?: BookingCustomerCreateRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Booking/customer';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static customer1(
    params: {
      /** requestBody */
      body?: BookingCustomerUpdateRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Booking/customer';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static customer2(
    params: {
      /**  */
      totalId?: number;
      /**  */
      index?: number;
      /**  */
      orderId?: string;
      /**  */
      workgroupId?: string;
      /**  */
      roomId?: number;
      /**  */
      roomIdentifierId?: string;
      /**  */
      deletedBy?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Booking/customer';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);
      configs.params = {
        TotalId: params['totalId'],
        Index: params['index'],
        OrderId: params['orderId'],
        WorkgroupId: params['workgroupId'],
        RoomId: params['roomId'],
        RoomIdentifierId: params['roomIdentifierId'],
        DeletedBy: params['deletedBy']
      };

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static pricing(
    params: {
      /** requestBody */
      body?: BookingPricingByRoom;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Booking/pricing';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static autoPricing(
    params: {
      /** requestBody */
      body?: BookingPricingByRoom;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Booking/autoPricing';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static preparePricing(
    params: {
      /** requestBody */
      body?: PrepareToPricingRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Booking/preparePricing';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static appliedSupplements(
    params: {
      /** requestBody */
      body?: AppliedSupplement;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Booking/appliedSupplements';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static research(
    params: {
      /** requestBody */
      body?: BookingPricingRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Booking/research';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static supplements(
    params: {
      /**  */
      dates?: any | null[];
      /**  */
      id?: number;
      /**  */
      acdId?: number;
      /**  */
      sessionId?: string;
      /**  */
      selectedRoomRateId?: number;
      /**  */
      isPublic?: boolean;
      /**  */
      supplierId?: string;
      /**  */
      customerGroupId?: string;
      /**  */
      representWorkgroupId?: string;
      /**  */
      buyOrSell?: number;
      /**  */
      workgroupId?: string;
      /**  */
      viewerId?: string;
      /**  */
      createdBy?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Booking/supplements';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        Dates: params['dates'],
        Id: params['id'],
        AcdId: params['acdId'],
        SessionId: params['sessionId'],
        SelectedRoomRateId: params['selectedRoomRateId'],
        IsPublic: params['isPublic'],
        SupplierId: params['supplierId'],
        CustomerGroupId: params['customerGroupId'],
        RepresentWorkgroupId: params['representWorkgroupId'],
        BuyOrSell: params['buyOrSell'],
        WorkgroupId: params['workgroupId'],
        ViewerId: params['viewerId'],
        CreatedBy: params['createdBy']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static promotions(
    params: {
      /**  */
      startDate?: string;
      /**  */
      endDate?: string;
      /**  */
      id?: number;
      /**  */
      acdId?: number;
      /**  */
      sessionId?: string;
      /**  */
      selectedRoomRateId?: number;
      /**  */
      supplierId?: string;
      /**  */
      customerGroupId?: string;
      /**  */
      representWorkgroupId?: string;
      /**  */
      buyOrSell?: number;
      /**  */
      workgroupId?: string;
      /**  */
      viewerId?: string;
      /**  */
      createdBy?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Booking/promotions';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        StartDate: params['startDate'],
        EndDate: params['endDate'],
        Id: params['id'],
        AcdId: params['acdId'],
        SessionId: params['sessionId'],
        SelectedRoomRateId: params['selectedRoomRateId'],
        SupplierId: params['supplierId'],
        CustomerGroupId: params['customerGroupId'],
        RepresentWorkgroupId: params['representWorkgroupId'],
        BuyOrSell: params['buyOrSell'],
        WorkgroupId: params['workgroupId'],
        ViewerId: params['viewerId'],
        CreatedBy: params['createdBy']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static otherServices(
    params: {
      /**  */
      dates?: any | null[];
      /**  */
      id?: number;
      /**  */
      acdId?: number;
      /**  */
      sessionId?: string;
      /**  */
      selectedRoomRateId?: number;
      /**  */
      isPublic?: boolean;
      /**  */
      supplierId?: string;
      /**  */
      customerGroupId?: string;
      /**  */
      representWorkgroupId?: string;
      /**  */
      buyOrSell?: number;
      /**  */
      workgroupId?: string;
      /**  */
      viewerId?: string;
      /**  */
      createdBy?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Booking/otherServices';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        Dates: params['dates'],
        Id: params['id'],
        AcdId: params['acdId'],
        SessionId: params['sessionId'],
        SelectedRoomRateId: params['selectedRoomRateId'],
        IsPublic: params['isPublic'],
        SupplierId: params['supplierId'],
        CustomerGroupId: params['customerGroupId'],
        RepresentWorkgroupId: params['representWorkgroupId'],
        BuyOrSell: params['buyOrSell'],
        WorkgroupId: params['workgroupId'],
        ViewerId: params['viewerId'],
        CreatedBy: params['createdBy']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class EventMessagesService {
  /**
   *
   */
  static receiveEvent(
    params: {
      /** requestBody */
      body?: EventMessageRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/EventMessages/receive-event';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class OrderService {
  /**
   *
   */
  static orderDetail(
    params: {
      /**  */
      orderId?: string;
      /**  */
      workgroupId?: string;
      /**  */
      createdBy?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Order/Admin/orderDetail';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        OrderId: params['orderId'],
        WorkgroupId: params['workgroupId'],
        CreatedBy: params['createdBy']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static orderDetail1(
    params: {
      /**  */
      orderId?: string;
      /**  */
      workgroupId?: string;
      /**  */
      createdBy?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Order/orderDetail';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        OrderId: params['orderId'],
        WorkgroupId: params['workgroupId'],
        CreatedBy: params['createdBy']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static order(
    params: {
      /** requestBody */
      body?: OrderDetailsCreateRequestNew;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Order/order';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static checkOrderBuyAvailable(
    params: {
      /** requestBody */
      body?: CreateOrderBuyByBookingServiceId;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Order/checkOrderBuyAvailable';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static orderAcdDetail(
    params: {
      /** requestBody */
      body?: OrderDetailsCreateRequestNew;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Order/orderAcdDetail';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static updateBookingCustomerTotal(
    params: {
      /** requestBody */
      body?: UpdateBookingCustomerTotal;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Order/order/updateBookingCustomerTotal';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static availableSuppliers(
    params: {
      /** requestBody */
      body?: AvailableSupplierRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Order/availableSuppliers';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static bookingDetail(
    params: {
      /** requestBody */
      body?: BookingDetailBySupplier;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Order/availableSuppliers/bookingDetail';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static promotions(
    params: {
      /**  */
      listPromotionIds?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Order/promotions';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { listPromotionIds: params['listPromotionIds'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static supplements(
    params: {
      /**  */
      listSupplementIds?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Order/supplements';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { listSupplementIds: params['listSupplementIds'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static suppliers(
    params: {
      /**  */
      orderId?: string;
      /**  */
      workgroupId?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Order/suppliers';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { OrderId: params['orderId'], WorkgroupId: params['workgroupId'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static searchInput(
    params: {
      /**  */
      orderId?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Order/searchInput';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { orderId: params['orderId'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class RoomService {
  /**
   *
   */
  static room(
    params: {
      /**  */
      roomId?: number;
      /**  */
      listRoomId?: string;
      /**  */
      acdId?: number;
      /**  */
      workgroupId?: string;
      /**  */
      representWorkgroupId?: string;
      /**  */
      isApproved?: boolean;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Room';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        RoomId: params['roomId'],
        ListRoomId: params['listRoomId'],
        AcdId: params['acdId'],
        WorkgroupId: params['workgroupId'],
        RepresentWorkgroupId: params['representWorkgroupId'],
        IsApproved: params['isApproved']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static room1(
    params: {
      /** requestBody */
      body?: RoomCreateRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Room';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static room2(
    params: {
      /** requestBody */
      body?: RoomUpdateRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Room';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static room3(
    params: {
      /**  */
      productId?: string;
      /**  */
      roomId?: number;
      /**  */
      acdId?: number;
      /**  */
      workgroupId?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Room';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);
      configs.params = {
        ProductId: params['productId'],
        RoomId: params['roomId'],
        AcdId: params['acdId'],
        WorkgroupId: params['workgroupId']
      };

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static clone(
    params: {
      /** requestBody */
      body?: RoomCloneRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Room/clone';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static paxInRoomSearch(
    params: {
      /** requestBody */
      body?: RoomRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Room/paxInRoomSearch';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static paxInRoom(
    params: {
      /**  */
      paxInRoomId?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Room/paxInRoom';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { paxInRoomId: params['paxInRoomId'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static amenities(
    params: {
      /**  */
      roomId?: number;
      /**  */
      roomRatesId?: number;
      /**  */
      acdId?: number;
      /**  */
      startTime?: string;
      /**  */
      endTime?: string;
      /**  */
      workgroupId?: string;
      /**  */
      representWorkgroupId?: string;
      /**  */
      viewerId?: string;
      /**  */
      sessionId?: string;
      /**  */
      supplierId?: string;
      /**  */
      customerGroupId?: string;
      /**  */
      buyOrSell?: number;
      /**  */
      isPublic?: boolean;
      /**  */
      priceClassId?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Room/amenities';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        RoomId: params['roomId'],
        RoomRatesId: params['roomRatesId'],
        AcdId: params['acdId'],
        StartTime: params['startTime'],
        EndTime: params['endTime'],
        WorkgroupId: params['workgroupId'],
        RepresentWorkgroupId: params['representWorkgroupId'],
        ViewerId: params['viewerId'],
        SessionId: params['sessionId'],
        SupplierId: params['supplierId'],
        CustomerGroupId: params['customerGroupId'],
        BuyOrSell: params['buyOrSell'],
        IsPublic: params['isPublic'],
        PriceClassId: params['priceClassId']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static amenities1(
    params: {
      /** requestBody */
      body?: AmenitiesRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Room/amenities';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static amenities2(
    params: {
      /** requestBody */
      body?: AmenitiesRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Room/amenities';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static amenities3(
    params: {
      /**  */
      id?: number;
      /**  */
      parentId?: number;
      /**  */
      parentType?: number;
      /**  */
      workgroupId?: string;
      /**  */
      representWorkgroupId?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Room/amenities';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);
      configs.params = {
        Id: params['id'],
        ParentId: params['parentId'],
        ParentType: params['parentType'],
        WorkgroupId: params['workgroupId'],
        RepresentWorkgroupId: params['representWorkgroupId']
      };

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static listAmenities(
    params: {
      /** requestBody */
      body?: AmenitiesRequest[];
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Room/listAmenities';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static listAmenities1(
    params: {
      /** requestBody */
      body?: AmenitiesUpdateRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Room/listAmenities';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static listAmenities2(
    params: {
      /** requestBody */
      body?: ListAmenitiesDeleteRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Room/listAmenities';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static supplements(
    params: {
      /**  */
      roomId?: number;
      /**  */
      roomRatesId?: number;
      /**  */
      acdId?: number;
      /**  */
      startTime?: string;
      /**  */
      endTime?: string;
      /**  */
      workgroupId?: string;
      /**  */
      representWorkgroupId?: string;
      /**  */
      viewerId?: string;
      /**  */
      sessionId?: string;
      /**  */
      supplierId?: string;
      /**  */
      customerGroupId?: string;
      /**  */
      buyOrSell?: number;
      /**  */
      isPublic?: boolean;
      /**  */
      priceClassId?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Room/supplements';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        RoomId: params['roomId'],
        RoomRatesId: params['roomRatesId'],
        AcdId: params['acdId'],
        StartTime: params['startTime'],
        EndTime: params['endTime'],
        WorkgroupId: params['workgroupId'],
        RepresentWorkgroupId: params['representWorkgroupId'],
        ViewerId: params['viewerId'],
        SessionId: params['sessionId'],
        SupplierId: params['supplierId'],
        CustomerGroupId: params['customerGroupId'],
        BuyOrSell: params['buyOrSell'],
        IsPublic: params['isPublic'],
        PriceClassId: params['priceClassId']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static roomrate(
    params: {
      /** requestBody */
      body?: RoomratesRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Room/roomrate';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static roomrate1(
    params: {
      /** requestBody */
      body?: RoomratesRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Room/roomrate';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static roomrate2(
    params: {
      /**  */
      id?: number;
      /**  */
      acdId?: number;
      /**  */
      roomId?: number;
      /**  */
      supplierId?: string;
      /**  */
      customerGroupId?: string;
      /**  */
      representWorkgroupId?: string;
      /**  */
      buyOrSell?: number;
      /**  */
      workgroupId?: string;
      /**  */
      viewerId?: string;
      /**  */
      createdBy?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Room/roomrate';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);
      configs.params = {
        Id: params['id'],
        AcdId: params['acdId'],
        RoomId: params['roomId'],
        SupplierId: params['supplierId'],
        CustomerGroupId: params['customerGroupId'],
        RepresentWorkgroupId: params['representWorkgroupId'],
        BuyOrSell: params['buyOrSell'],
        WorkgroupId: params['workgroupId'],
        ViewerId: params['viewerId'],
        CreatedBy: params['createdBy']
      };

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static images(
    params: {
      /**  */
      acdId?: number;
      /**  */
      workgroupId?: string;
      /**  */
      roomId?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Room/images';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { AcdId: params['acdId'], WorkgroupId: params['workgroupId'], RoomId: params['roomId'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static images1(
    params: {
      /** requestBody */
      body?: ImageInsertRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Room/images';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static images2(
    params: {
      /**  */
      id: number;
      /**  */
      acdId?: number;
      /**  */
      workgroupId?: string;
      /**  */
      roomId?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Room/images/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);
      configs.params = { AcdId: params['acdId'], WorkgroupId: params['workgroupId'], RoomId: params['roomId'] };

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static acdRoomSchedules(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Room/acdRoomSchedules';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static roomSchedules(
    params: {
      /**  */
      acdId?: number;
      /**  */
      representWorkgroupId?: string;
      /**  */
      ownerId?: string;
      /**  */
      startDate?: string;
      /**  */
      endDate?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Room/roomSchedules';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        AcdId: params['acdId'],
        RepresentWorkgroupId: params['representWorkgroupId'],
        OwnerId: params['ownerId'],
        StartDate: params['startDate'],
        EndDate: params['endDate']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export interface OtherServicesPriceOptionRequest {
  /**  */
  otherServiceId?: number;

  /**  */
  acdId?: number;

  /**  */
  startTime?: string;

  /**  */
  endTime?: string;

  /**  */
  listRoomClassIdApply?: string;

  /**  */
  listActiveDayInWeek?: string;

  /**  */
  supplierId?: string;

  /**  */
  customerGroupId?: string;

  /**  */
  representWorkgroupId?: string;

  /**  */
  buyOrSell?: number;
}

export interface OtherServicesPriceCreateRequest {
  /**  */
  id?: number;

  /**  */
  name?: string;

  /**  */
  description?: string;

  /**  */
  otherServiceId?: number;

  /**  */
  acdId?: number;

  /**  */
  startDateApply?: string;

  /**  */
  endDateApply?: string;

  /**  */
  openingTime?: string;

  /**  */
  closingTime?: string;

  /**  */
  listRoomClassIdApply?: string;

  /**  */
  buyPrice?: number;

  /**  */
  sellPrice?: number;

  /**  */
  listPricingMethodId?: string;

  /**  */
  listActiveDayInWeek?: string;

  /**  */
  currencyId?: number;

  /**  */
  createdBy?: number;

  /**  */
  buyOrSell?: number;

  /**  */
  supplierId?: string;

  /**  */
  customerGroupId?: string;

  /**  */
  representWorkgroupId?: string;

  /**  */
  roomclassApplies?: number[];

  /**  */
  pricingMethods?: number[];

  /**  */
  priceClassId?: number;

  /**  */
  validOnMon?: boolean;

  /**  */
  validOnTue?: boolean;

  /**  */
  validOnWed?: boolean;

  /**  */
  validOnThu?: boolean;

  /**  */
  validOnFri?: boolean;

  /**  */
  validOnSat?: boolean;

  /**  */
  validOnSun?: boolean;
}

export interface OtherServicesPriceUpdateRequest {
  /**  */
  id?: number;

  /**  */
  otherServiceId?: number;

  /**  */
  name?: string;

  /**  */
  description?: string;

  /**  */
  acdId?: number;

  /**  */
  startDateApply?: string;

  /**  */
  endDateApply?: string;

  /**  */
  openingTime?: string;

  /**  */
  closingTime?: string;

  /**  */
  listRoomClassIdApply?: string;

  /**  */
  buyPrice?: number;

  /**  */
  sellPrice?: number;

  /**  */
  listPricingMethodId?: string;

  /**  */
  listActiveDayInWeek?: string;

  /**  */
  currencyId?: number;

  /**  */
  createdBy?: number;

  /**  */
  buyOrSell?: number;

  /**  */
  supplierId?: string;

  /**  */
  customerGroupId?: string;

  /**  */
  representWorkgroupId?: string;

  /**  */
  roomclassApplies?: number[];

  /**  */
  pricingMethods?: number[];

  /**  */
  priceClassId?: number;

  /**  */
  validOnMon?: boolean;

  /**  */
  validOnTue?: boolean;

  /**  */
  validOnWed?: boolean;

  /**  */
  validOnThu?: boolean;

  /**  */
  validOnFri?: boolean;

  /**  */
  validOnSat?: boolean;

  /**  */
  validOnSun?: boolean;
}

export interface OtherServicesCreateRequest {
  /**  */
  name?: string;

  /**  */
  description?: string;

  /**  */
  quantity?: number;

  /**  */
  categoryServiceId?: string;

  /**  */
  acdId?: number;

  /**  */
  isActive?: boolean;

  /**  */
  supplierId?: string;

  /**  */
  customerGroupId?: string;

  /**  */
  representWorkgroupId?: string;

  /**  */
  buyOrSell?: number;
}

export interface OtherServicesUpdateRequest {
  /**  */
  id?: number;

  /**  */
  name?: string;

  /**  */
  description?: string;

  /**  */
  quantity?: number;

  /**  */
  acdId?: number;

  /**  */
  isActive?: boolean;

  /**  */
  productId?: string;

  /**  */
  categoryServiceId?: string;

  /**  */
  supplierId?: string;

  /**  */
  customerGroupId?: string;

  /**  */
  representWorkgroupId?: string;

  /**  */
  buyOrSell?: number;
}

export interface PolicyCreateRequest {
  /**  */
  id?: number;

  /**  */
  acdId?: number;

  /**  */
  viewerIdSellDefault?: string;

  /**  */
  name?: string;

  /**  */
  type?: number;

  /**  */
  minAge?: number;

  /**  */
  maxAge?: number;

  /**  */
  startDateApply?: string;

  /**  */
  endDateApply?: string;

  /**  */
  minValue?: number;

  /**  */
  maxValue?: number;

  /**  */
  maxValueHours?: number;

  /**  */
  roomQtyMin?: number;

  /**  */
  roomQtyMax?: number;

  /**  */
  roomQty?: number;

  /**  */
  roomFree?: number;

  /**  */
  roomFreeMax?: number;

  /**  */
  numberOfAllotment?: number;

  /**  */
  bookingBefore?: number;

  /**  */
  listBlackOutDates?: string;

  /**  */
  unit?: number;

  /**  */
  penaltyMethod?: number;

  /**  */
  fee?: number;

  /**  */
  rangeName?: string;

  /**  */
  level?: number;

  /**  */
  description?: string;

  /**  */
  checkIn?: string;

  /**  */
  checkOut?: string;

  /**  */
  isEnabled?: boolean;

  /**  */
  calculationKey?: number;

  /**  */
  policyGroupId?: number;

  /**  */
  lastEditedBy?: number;

  /**  */
  policyAgeGroupName?: string;

  /**  */
  priceClassId?: number;

  /**  */
  supplierId?: string;

  /**  */
  customerGroupId?: string;

  /**  */
  representWorkgroupId?: string;

  /**  */
  buyOrSell?: number;
}

export interface DateRange {
  /**  */
  startDateApply?: string;

  /**  */
  endDateApply?: string;
}

export interface PolicySupplierRequest {
  /**  */
  acdId?: number;

  /**  */
  workgroupId?: string;

  /**  */
  supplierIds?: string[];

  /**  */
  customerGroupId?: string;

  /**  */
  buyOrSell?: number;
}

export interface PolicyUpdateRequest {
  /**  */
  policies?: PolicyCreateRequest[];

  /**  */
  deletedPolicies?: PolicyCreateRequest[];
}

export interface PoliciesDeleteRequest {
  /**  */
  listPolicyId?: string;

  /**  */
  acdId?: number;

  /**  */
  supplierId?: string;

  /**  */
  customerGroupId?: string;

  /**  */
  representWorkgroupId?: string;

  /**  */
  buyOrSell?: number;
}

export interface PolicyGroupRequest {
  /**  */
  id?: number;

  /**  */
  name?: string;

  /**  */
  acdId?: number;

  /**  */
  policyGroupId?: number;

  /**  */
  supplierId?: string;

  /**  */
  customerGroupId?: string;

  /**  */
  representWorkgroupId?: string;

  /**  */
  buyOrSell?: number;
}

export interface AcdRequest {
  /**  */
  acdId?: number;

  /**  */
  metaDescription?: string;

  /**  */
  representWorkgroupId?: string;
}

export interface ImageInsertRequest {
  /**  */
  acdId?: number;

  /**  */
  imageLink?: string;

  /**  */
  representWorkgroupId?: string;

  /**  */
  roomId?: number;
}

export interface AcdUpdateRequest {
  /**  */
  id?: number;

  /**  */
  acdId?: number;

  /**  */
  name?: string;

  /**  */
  code?: string;

  /**  */
  address?: string;

  /**  */
  placeId?: string;

  /**  */
  placeDetail?: string;

  /**  */
  postalCode?: string;

  /**  */
  emailBooking?: string;

  /**  */
  email?: string;

  /**  */
  hotline?: string;

  /**  */
  phoneNumber?: string;

  /**  */
  website?: string;

  /**  */
  starRating?: number;

  /**  */
  cityName?: string;

  /**  */
  provinceName?: string;

  /**  */
  brandId?: number;

  /**  */
  brandName?: string;

  /**  */
  chainId?: number;

  /**  */
  chainName?: string;

  /**  */
  viewerId?: string;

  /**  */
  representWorkgroupId?: string;

  /**  */
  countryCode?: string;

  /**  */
  listAmenities?: string;

  /**  */
  contactName?: string;

  /**  */
  contactPosition?: string;

  /**  */
  categoryServiceIds?: string;
}

export interface AcdPublishRequest {
  /**  */
  id?: number;

  /**  */
  workgroupId?: string;
}

export interface Product {
  /**  */
  id?: string;

  /**  */
  isSelected?: boolean;

  /**  */
  isInternal?: boolean;

  /**  */
  categoryServiceId?: string;

  /**  */
  supplierDefaultId?: string;
}

export interface AcdProductGenerateRequest {
  /**  */
  supplierId?: string;

  /**  */
  customerGroupId?: string;

  /**  */
  buyOrSell?: number;

  /**  */
  isInternal?: boolean;

  /**  */
  products?: Product[];
}

export interface CheckProductPriceRequest {
  /**  */
  productId?: string;

  /**  */
  supplierId?: string;

  /**  */
  customerGroupId?: string;

  /**  */
  buyOrSell?: number;
}

export interface RoomrateRange {
  /**  */
  minPrice?: number;

  /**  */
  maxPrice?: number;
}

export interface PricingRoomConfig {
  /**  */
  roomQty?: number;

  /**  */
  adults?: number;

  /**  */
  childs?: number;

  /**  */
  infants?: number;

  /**  */
  group?: string;

  /**  */
  id?: string;

  /**  */
  isSelected?: boolean;

  /**  */
  roomConfigId?: string;

  /**  */
  roomIndex?: number;

  /**  */
  name?: string;
}

export interface RoomSearchRequest {
  /**  */
  keyword?: string;

  /**  */
  cityCode?: string;

  /**  */
  cityName?: string;

  /**  */
  placeId?: string;

  /**  */
  startDate?: string;

  /**  */
  endDate?: string;

  /**  */
  nights?: number;

  /**  */
  adults?: number;

  /**  */
  childs?: number;

  /**  */
  starRating?: number[];

  /**  */
  langCode?: string;

  /**  */
  roomrateRange?: CombinedRoomrateRangeTypes;

  /**  */
  viewerId?: string;

  /**  */
  supplierId?: string;

  /**  */
  customGroupId?: string;

  /**  */
  isPublic?: boolean;

  /**  */
  buyOrSell?: number;

  /**  */
  priceClassIds?: string;

  /**  */
  roomQty?: number;

  /**  */
  maxAdult?: number;

  /**  */
  listRoomId?: string;

  /**  */
  acdId?: number;

  /**  */
  workgroupId?: string;

  /**  */
  roomClassId?: number;

  /**  */
  roomConfigs?: PricingRoomConfig[];

  /**  */
  categoryServiceIds?: string[];

  /**  */
  pageSize?: number;

  /**  */
  pageIndex?: number;

  /**  */
  orderBy?: string;

  /**  */
  orderByDesc?: boolean;
}

export interface RoomSearchSupplierRequest {
  /**  */
  keyword?: string;

  /**  */
  cityCode?: string;

  /**  */
  cityName?: string;

  /**  */
  placeId?: string;

  /**  */
  startDate?: string;

  /**  */
  endDate?: string;

  /**  */
  nights?: number;

  /**  */
  adults?: number;

  /**  */
  childs?: number;

  /**  */
  starRating?: number[];

  /**  */
  langCode?: string;

  /**  */
  roomrateRange?: CombinedRoomrateRangeTypes;

  /**  */
  viewerId?: string;

  /**  */
  supplierId?: string;

  /**  */
  customGroupId?: string;

  /**  */
  isPublic?: boolean;

  /**  */
  buyOrSell?: number;

  /**  */
  priceClassIds?: string;

  /**  */
  roomQty?: number;

  /**  */
  maxAdult?: number;

  /**  */
  listRoomId?: string;

  /**  */
  acdId?: number;

  /**  */
  workgroupId?: string;

  /**  */
  roomClassId?: number;

  /**  */
  categoryServiceIds?: string[];

  /**  */
  roomConfigs?: PricingRoomConfig[];

  /**  */
  pageSize?: number;

  /**  */
  pageIndex?: number;

  /**  */
  orderBy?: string;

  /**  */
  orderByDesc?: boolean;
}

export interface AcdProductRoomratesOptionRequest {
  /**  */
  acdId?: number;

  /**  */
  roomId?: number;

  /**  */
  priceClassId?: number;

  /**  */
  fromUsingDate?: string;

  /**  */
  toUsingDate?: string;

  /**  */
  buyBefore?: number;

  /**  */
  nightQtyMin?: number;

  /**  */
  nightQtyMax?: number;

  /**  */
  roomQtyMin?: number;

  /**  */
  roomQtyMax?: number;

  /**  */
  listActiveDayInWeek?: string;

  /**  */
  supplierId?: string;

  /**  */
  customerGroupId?: string;

  /**  */
  representWorkgroupId?: string;

  /**  */
  buyOrSell?: number;
}

export interface AmenitiesRequest {
  /**  */
  id?: number;

  /**  */
  categoryId?: number;

  /**  */
  name?: string;

  /**  */
  icon?: string;

  /**  */
  description?: string;

  /**  */
  parentId?: number;

  /**  */
  parentType?: number;

  /**  */
  isModified?: boolean;

  /**  */
  representWorkgroupId?: string;

  /**  */
  workgroupId?: string;

  /**  */
  createdBy?: number;

  /**  */
  lastEditedBy?: number;
}

export interface AmenitiesCateRequest {
  /**  */
  id?: number;

  /**  */
  name?: string;

  /**  */
  acdId?: number;

  /**  */
  workgroupId?: string;

  /**  */
  representWorkgroupId?: string;

  /**  */
  createdBy?: number;

  /**  */
  lastEditedBy?: number;
}

export interface AmenitiesUpdateRequest {
  /**  */
  acdId?: number;

  /**  */
  parentId?: number;

  /**  */
  parentType?: number;

  /**  */
  workgroupId?: string;

  /**  */
  representWorkgroupId?: string;

  /**  */
  lastEditedBy?: number;

  /**  */
  listAmenities?: AmenitiesRequest[];

  /**  */
  listAmenitiesDeleted?: AmenitiesRequest[];
}

export interface ListAmenitiesDeleteRequest {
  /**  */
  listAmenitiesId?: string;

  /**  */
  parentId?: number;

  /**  */
  parentType?: number;

  /**  */
  workgroupId?: string;

  /**  */
  representWorkgroupId?: string;
}

export interface PromotionDetail {
  /**  */
  buyPrice?: number;

  /**  */
  promotionPricingMethod?: number;

  /**  */
  otherServiceId?: number;

  /**  */
  otherServiceName?: string;

  /**  */
  appliedSupplementCategory?: number;

  /**  */
  appliedSupplement?: number;

  /**  */
  appliedSupplementName?: string;

  /**  */
  currencyId?: number;
}

export interface PromotionCreateRequest {
  /**  */
  id?: number;

  /**  */
  acdId?: number;

  /**  */
  type?: number;

  /**  */
  supplierId?: string;

  /**  */
  customerGroupId?: string;

  /**  */
  representWorkgroupId?: string;

  /**  */
  buyOrSell?: number;

  /**  */
  bookingStartAt?: string;

  /**  */
  bookingEndAt?: string;

  /**  */
  usingStartAt?: string;

  /**  */
  usingEndAt?: string;

  /**  */
  numberOfNightPaid?: number;

  /**  */
  numberOfNightUsed?: number;

  /**  */
  numberOfDuplicate?: number;

  /**  */
  bookingBefore?: number;

  /**  */
  promotionPrice?: number;

  /**  */
  buyPrice?: number;

  /**  */
  minimumNight?: number;

  /**  */
  listActiveDayInWeek?: string;

  /**  */
  note?: string;

  /**  */
  createdBy?: number;

  /**  */
  promotionPricingMethod?: number;

  /**  */
  currencyId?: number;

  /**  */
  roomclassApplies?: number[];

  /**  */
  roomclassDeleted?: number[];

  /**  */
  promotionCombined?: number[];

  /**  */
  roomQty?: number;

  /**  */
  roomFree?: number;

  /**  */
  roomFreeMax?: number;

  /**  */
  promotionDetails?: PromotionDetail[];

  /**  */
  priceClassId?: number;

  /**  */
  isConsecutive?: boolean;

  /**  */
  validOnMon?: boolean;

  /**  */
  validOnTue?: boolean;

  /**  */
  validOnWed?: boolean;

  /**  */
  validOnThu?: boolean;

  /**  */
  validOnFri?: boolean;

  /**  */
  validOnSat?: boolean;

  /**  */
  validOnSun?: boolean;
}

export interface SupplementCreateRequest {
  /**  */
  id?: number;

  /**  */
  categoryId?: number;

  /**  */
  categoryName?: string;

  /**  */
  name?: string;

  /**  */
  description?: string;

  /**  */
  acdId?: number;

  /**  */
  workgroupId?: string;

  /**  */
  createdBy?: number;

  /**  */
  isEnabled?: boolean;
}

export interface UpdateSupplementsRequest {
  /**  */
  acdId?: number;

  /**  */
  supplementCreateRequests?: SupplementCreateRequest[];
}

export interface SupplementsDeleteRequest {
  /**  */
  listSupplementId?: string;

  /**  */
  acdId?: number;

  /**  */
  workgroupId?: string;
}

export interface SupplementCategoryRequest {
  /**  */
  id?: number;

  /**  */
  name?: string;

  /**  */
  acdId?: number;

  /**  */
  workgroupId?: string;

  /**  */
  createdBy?: number;
}

export interface AcdSupplementCreateRequest {
  /**  */
  id?: number;

  /**  */
  acdId?: number;

  /**  */
  viewerId?: string;

  /**  */
  viewerSellDefaultId?: string;

  /**  */
  workgroupId?: string;

  /**  */
  supplementId?: number;

  /**  */
  isForce?: boolean;

  /**  */
  startTime?: string;

  /**  */
  endTime?: string;

  /**  */
  listRoomClassIdApply?: string;

  /**  */
  method?: number;

  /**  */
  buyPrice?: number;

  /**  */
  sellPrice?: number;

  /**  */
  listPricingMethodId?: string;

  /**  */
  listActiveDayInWeek?: string;

  /**  */
  currencyId?: number;

  /**  */
  createdBy?: number;

  /**  */
  buyOrSell?: number;

  /**  */
  supplierId?: string;

  /**  */
  customerGroupId?: string;

  /**  */
  representWorkgroupId?: string;

  /**  */
  roomclassApplies?: number[];

  /**  */
  pricingMethods?: number[];

  /**  */
  maxHours?: string;

  /**  */
  priceClassId?: number;

  /**  */
  validOnMon?: boolean;

  /**  */
  validOnTue?: boolean;

  /**  */
  validOnWed?: boolean;

  /**  */
  validOnThu?: boolean;

  /**  */
  validOnFri?: boolean;

  /**  */
  validOnSat?: boolean;

  /**  */
  validOnSun?: boolean;
}

export interface AcdSupplementsDeleteRequest {
  /**  */
  listAcdSupplementId?: string;

  /**  */
  acdId?: number;

  /**  */
  supplierId?: string;

  /**  */
  customerGroupId?: string;

  /**  */
  representWorkgroupId?: string;

  /**  */
  buyOrSell?: number;
}

export interface AcdSupplementOptionRequest {
  /**  */
  acdId?: number;

  /**  */
  supplementId?: number;

  /**  */
  isPublic?: boolean;

  /**  */
  listRoomClassId?: string;

  /**  */
  startTime?: string;

  /**  */
  endTime?: string;

  /**  */
  priceClassId?: number;

  /**  */
  listActiveDayInWeek?: string;

  /**  */
  supplierId?: string;

  /**  */
  customerGroupId?: string;

  /**  */
  representWorkgroupId?: string;

  /**  */
  buyOrSell?: number;
}

export interface OtherServicesPriceDeleteRequest {
  /**  */
  id?: number;

  /**  */
  acdId?: number;

  /**  */
  supplierId?: string;

  /**  */
  customerGroupId?: string;

  /**  */
  representWorkgroupId?: string;

  /**  */
  buyOrSell?: number;
}

export interface BookingContactCreateRequest {
  /**  */
  orderId?: string;

  /**  */
  workgroupId?: string;

  /**  */
  customGroupId?: string;

  /**  */
  customGroupName?: string;

  /**  */
  id?: string;

  /**  */
  bookingId?: string;

  /**  */
  firstName?: string;

  /**  */
  lastName?: string;

  /**  */
  gender?: number;

  /**  */
  address?: string;

  /**  */
  phoneNumber?: string;

  /**  */
  taxNumber?: string;

  /**  */
  email?: string;

  /**  */
  hotline?: string;

  /**  */
  company?: string;

  /**  */
  note?: string;

  /**  */
  bookingEmail?: string;

  /**  */
  bookingAddress?: string;

  /**  */
  bankNumber?: string;

  /**  */
  bankName?: string;

  /**  */
  bankBranch?: string;

  /**  */
  isUsing?: boolean;

  /**  */
  isBooking?: boolean;

  /**  */
  createdBy?: number;
}

export interface BookingContactUpdateRequest {
  /**  */
  orderId?: string;

  /**  */
  customGroupId?: string;

  /**  */
  customGroupName?: string;

  /**  */
  id?: string;

  /**  */
  firstName?: string;

  /**  */
  lastName?: string;

  /**  */
  gender?: number;

  /**  */
  phoneNumber?: string;

  /**  */
  email?: string;

  /**  */
  hotline?: string;

  /**  */
  taxNumber?: string;

  /**  */
  address?: string;

  /**  */
  company?: string;

  /**  */
  note?: string;

  /**  */
  bookingEmail?: string;

  /**  */
  bookingAddress?: string;

  /**  */
  bankNumber?: string;

  /**  */
  bankName?: string;

  /**  */
  bankBranch?: string;

  /**  */
  modifiedBy?: number;
}

export interface Group {
  /**  */
  id?: string;

  /**  */
  name?: string;
}

export interface BookingCustomerCreateRequest {
  /**  */
  orderId?: string;

  /**  */
  bookingId?: string;

  /**  */
  roomIdentifierId?: string;

  /**  */
  workgroupId?: string;

  /**  */
  roomId?: number;

  /**  */
  policyId?: number;

  /**  */
  policyGroupId?: number;

  /**  */
  firstName?: string;

  /**  */
  lastName?: string;

  /**  */
  age?: number;

  /**  */
  birthday?: string;

  /**  */
  gender?: number;

  /**  */
  type?: string;

  /**  */
  index?: number;

  /**  */
  group?: Group[];

  /**  */
  guestIdentifier?: number;

  /**  */
  identificationNumber?: string;

  /**  */
  passportNumber?: string;

  /**  */
  passportExpiryDate?: string;

  /**  */
  passportIssueCountry?: string;

  /**  */
  createdBy?: number;
}

export interface BookingCustomerUpdateRequest {
  /**  */
  totalId?: number;

  /**  */
  orderId?: string;

  /**  */
  roomIdentifierId?: string;

  /**  */
  workgroupId?: string;

  /**  */
  roomId?: number;

  /**  */
  firstName?: string;

  /**  */
  lastName?: string;

  /**  */
  age?: number;

  /**  */
  birthday?: string;

  /**  */
  gender?: number;

  /**  */
  type?: string;

  /**  */
  policyId?: number;

  /**  */
  index?: number;

  /**  */
  group?: Group[];

  /**  */
  guestIdentifier?: number;

  /**  */
  identificationNumber?: string;

  /**  */
  passportNumber?: string;

  /**  */
  passportExpiryDate?: string;

  /**  */
  passportIssueCountry?: string;

  /**  */
  modifiedBy?: number;
}

export interface AgePolicy {
  /**  */
  id?: number;

  /**  */
  acdId?: number;

  /**  */
  name?: string;

  /**  */
  type?: number;

  /**  */
  minAge?: number;

  /**  */
  maxAge?: number;

  /**  */
  unit?: number;

  /**  */
  isEnabled?: boolean;

  /**  */
  policyGroupId?: number;

  /**  */
  policyGroupName?: object;

  /**  */
  calculationKey?: number;

  /**  */
  priceClassId?: number;
}

export interface Guest {
  /**  */
  lastName?: string;

  /**  */
  firstName?: string;

  /**  */
  gender?: number;

  /**  */
  quantity?: number;

  /**  */
  birthday?: string;

  /**  */
  identificationType?: number;

  /**  */
  identificationNumber?: string;

  /**  */
  passportNumber?: string;

  /**  */
  passportExpiryDate?: string;

  /**  */
  passportIssueCountry?: string;

  /**  */
  id?: string;

  /**  */
  type?: string;

  /**  */
  index?: number;

  /**  */
  group?: Group[];

  /**  */
  phone?: string;

  /**  */
  email?: string;

  /**  */
  guestIdentifier?: number;

  /**  */
  name?: string;

  /**  */
  displayName?: string;

  /**  */
  age?: number;

  /**  */
  agePolicy?: CombinedAgePolicyTypes;
}

export interface Days {
  /**  */
  date?: string;

  /**  */
  dayActive?: string;
}

export interface SelectedSupplement {
  /**  */
  id?: number;

  /**  */
  cloneById?: number;

  /**  */
  quantity?: number;

  /**  */
  priceClassId?: number;

  /**  */
  daySearchInWeek?: Days[];

  /**  */
  supplementId?: number;

  /**  */
  isForce?: boolean;

  /**  */
  method?: number;

  /**  */
  buyPrice?: number;

  /**  */
  sellPrice?: number;

  /**  */
  maxHours?: string;

  /**  */
  type?: string;

  /**  */
  currencyId?: number;

  /**  */
  name?: string;

  /**  */
  isValidApplied?: boolean;

  /**  */
  listPricingMethodId?: string;

  /**  */
  prefixKey?: string;
}

export interface SelectedPromotion {
  /**  */
  id?: number;

  /**  */
  cloneById?: number;

  /**  */
  acdId?: number;

  /**  */
  type?: number;

  /**  */
  promotionPricingMethod?: number;

  /**  */
  currencyId?: number;

  /**  */
  supplierId?: string;

  /**  */
  priceClassId?: number;

  /**  */
  promotionName?: string;

  /**  */
  appliedPromotionPrice?: number;

  /**  */
  numberOfNightUsed?: number;

  /**  */
  numberOfNightPaid?: number;

  /**  */
  roomFree?: number;

  /**  */
  roomFreeMax?: number;

  /**  */
  roomQty?: number;

  /**  */
  prefixKey?: string;

  /**  */
  promotionCombined?: SelectedPromotion[];
}

export interface SelectedOtherService {
  /**  */
  id?: number;

  /**  */
  cloneById?: number;

  /**  */
  quantity?: number;

  /**  */
  daySearchInWeek?: Days[];

  /**  */
  otherServiceId?: number;

  /**  */
  buyPrice?: number;

  /**  */
  sellPrice?: number;

  /**  */
  promotionPrice?: number;

  /**  */
  promotionSellPrice?: number;

  /**  */
  openingTime?: string;

  /**  */
  closingTime?: string;

  /**  */
  currencyId?: number;

  /**  */
  name?: string;

  /**  */
  description?: string;

  /**  */
  isValidApplied?: boolean;

  /**  */
  listPricingMethodId?: string;

  /**  */
  prefixKey?: string;
}

export interface RoomConfig {
  /**  */
  orderAcdDetailId?: string;

  /**  */
  date?: string;

  /**  */
  selectedRoomRateId?: number;

  /**  */
  selectedSupplements?: SelectedSupplement[];

  /**  */
  selectedPromotions?: SelectedPromotion[];

  /**  */
  selectedOtherServices?: SelectedOtherService[];

  /**  */
  buyPrice?: number;

  /**  */
  sellPrice?: number;

  /**  */
  promotionPrice?: number;

  /**  */
  promotionSellPriceBeforeMarkup?: number;

  /**  */
  promotionSellPrice?: number;

  /**  */
  isPromotionApplied?: boolean;

  /**  */
  isConfigActive?: boolean;

  /**  */
  isValidRoomrate?: boolean;

  /**  */
  isValidConfig?: boolean;

  /**  */
  isExternalServices?: boolean;

  /**  */
  prefixKey?: string;
}

export interface PriceTotal {
  /**  */
  buyPrice?: number;

  /**  */
  sellPrice?: number;

  /**  */
  promotionPrice?: number;

  /**  */
  promotionSellPriceBeforeMarkup?: number;

  /**  */
  promotionSellPrice?: number;
}

export interface RoomSetup {
  /**  */
  roomIdentifierId?: string;

  /**  */
  config?: CombinedConfigTypes;

  /**  */
  identityIndex?: number;

  /**  */
  roomReferenceIds?: string[];

  /**  */
  id?: number;

  /**  */
  acdId?: number;

  /**  */
  accommodationName?: string;

  /**  */
  code?: string;

  /**  */
  name?: string;

  /**  */
  guests?: Guest[];

  /**  */
  supplierId?: string;

  /**  */
  supplierName?: string;

  /**  */
  sessionId?: string;

  /**  */
  workgroupId?: string;

  /**  */
  representWorkgroupId?: string;

  /**  */
  isValid?: boolean;

  /**  */
  paxInRoomId?: number;

  /**  */
  roomConfig?: RoomConfig[];

  /**  */
  roomPriceTotal?: CombinedRoomPriceTotalTypes;

  /**  */
  priceClassId?: number;

  /**  */
  priceClassName?: string;

  /**  */
  dateChange?: number;

  /**  */
  prefixKey?: string;
}

export interface Markup {
  /**  */
  method?: string;

  /**  */
  value?: number;
}

export interface BookingPricingByRoom {
  /**  */
  roomSetups?: RoomSetup[];

  /**  */
  priceTotal?: CombinedPriceTotalTypes;

  /**  */
  markUp?: CombinedMarkUpTypes;
}

export interface PrepareRoomClass {
  /**  */
  id?: number;

  /**  */
  isSelected?: boolean;

  /**  */
  paxInRoomId?: number;

  /**  */
  roomIdentifierId?: string;

  /**  */
  acdId?: number;

  /**  */
  supplierId?: string;

  /**  */
  displayPrice?: number;

  /**  */
  sessionId?: string;

  /**  */
  title?: string;

  /**  */
  subtitle?: string;

  /**  */
  priceClassId?: number;
}

export interface PrepareRoomConfig {
  /**  */
  roomQty?: number;

  /**  */
  adults?: number;

  /**  */
  childs?: number;

  /**  */
  infants?: number;

  /**  */
  group?: string;

  /**  */
  guests?: number;

  /**  */
  id?: string;

  /**  */
  isSelected?: boolean;

  /**  */
  roomConfigId?: string;

  /**  */
  roomIndex?: number;

  /**  */
  passengers?: Guest[];

  /**  */
  roomClass?: CombinedRoomClassTypes;

  /**  */
  name?: string;
}

export interface PrepareToPricingRequest {
  /**  */
  startDate?: string;

  /**  */
  nights?: number;

  /**  */
  adults?: number;

  /**  */
  child?: number;

  /**  */
  guests?: number;

  /**  */
  rooms?: PrepareRoomConfig[];

  /**  */
  quotationId?: string;
}

export interface BookingSupplementInfo {
  /**  */
  roomId?: number;

  /**  */
  sessionId?: string;

  /**  */
  date?: string;
}

export interface AppliedSupplement {
  /**  */
  acdId?: number;

  /**  */
  adult?: number;

  /**  */
  child?: number;

  /**  */
  infant?: number;

  /**  */
  workgroupId?: string;

  /**  */
  appliedPaxInRoom?: number;

  /**  */
  bookingSupplementInfos?: BookingSupplementInfo[];
}

export interface PromotionResponse {
  /**  */
  id?: number;

  /**  */
  acdId?: number;

  /**  */
  type?: number;

  /**  */
  bookingStartAt?: string;

  /**  */
  bookingEndAt?: string;

  /**  */
  usingStartAt?: string;

  /**  */
  usingEndAt?: string;

  /**  */
  numberOfNightUsed?: number;

  /**  */
  numberOfNightPaid?: number;

  /**  */
  isDuplicated?: boolean;

  /**  */
  numberOfDuplicate?: number;

  /**  */
  note?: string;

  /**  */
  promotionCombined?: PromotionResponse[];

  /**  */
  listCombined?: string;

  /**  */
  listRoomClassId?: string;

  /**  */
  promotionPricingMethod?: number;

  /**  */
  listActiveDayInWeek?: string;

  /**  */
  bookingBefore?: number;

  /**  */
  promotionPrice?: number;

  /**  */
  buyPrice?: number;

  /**  */
  minimumNight?: number;

  /**  */
  lastEditDate?: string;

  /**  */
  lastEditBy?: number;

  /**  */
  durationId?: number;

  /**  */
  viewerId?: string;

  /**  */
  promotionName?: string;

  /**  */
  currencyId?: number;

  /**  */
  isCombined?: boolean;

  /**  */
  roomQty?: number;

  /**  */
  roomFree?: number;

  /**  */
  roomFreeMax?: number;

  /**  */
  promotionDetails?: PromotionDetail[];

  /**  */
  daySearchInWeek?: Days[];

  /**  */
  roomClassIdApplied?: number[];

  /**  */
  isApproved?: boolean;

  /**  */
  cloneById?: number;

  /**  */
  isModified?: boolean;

  /**  */
  supplierId?: string;

  /**  */
  priceClassId?: number;

  /**  */
  isConsecutive?: boolean;

  /**  */
  appliedPromotionPrice?: number;

  /**  */
  workgroupId?: string;

  /**  */
  representWorkgroupId?: string;

  /**  */
  numberOfApplied?: number;

  /**  */
  validOnMon?: boolean;

  /**  */
  validOnTue?: boolean;

  /**  */
  validOnWed?: boolean;

  /**  */
  validOnThu?: boolean;

  /**  */
  validOnFri?: boolean;

  /**  */
  validOnSat?: boolean;

  /**  */
  validOnSun?: boolean;
}

export interface SupplementResponse {
  /**  */
  acdId?: number;

  /**  */
  id?: number;

  /**  */
  supplementId?: number;

  /**  */
  supplementCategory?: number;

  /**  */
  name?: string;

  /**  */
  description?: string;

  /**  */
  isForce?: boolean;

  /**  */
  applyWithPromotionPrice?: boolean;

  /**  */
  startDateApply?: string;

  /**  */
  endDateApply?: string;

  /**  */
  listRoomClassIdApply?: string;

  /**  */
  listActiveDayInWeek?: string;

  /**  */
  listPricingMethodId?: string;

  /**  */
  buyPrice?: number;

  /**  */
  method?: number;

  /**  */
  sellPrice?: number;

  /**  */
  currencyId?: number;

  /**  */
  isDeleted?: boolean;

  /**  */
  viewerId?: string;

  /**  */
  supplierId?: string;

  /**  */
  durationId?: number;

  /**  */
  roomQty?: number;

  /**  */
  roomFree?: number;

  /**  */
  roomFreeMax?: number;

  /**  */
  daySearchInWeek?: Days[];

  /**  */
  quantity?: number;

  /**  */
  isApproved?: boolean;

  /**  */
  cloneById?: number;

  /**  */
  isModified?: boolean;

  /**  */
  maxHours?: string;

  /**  */
  priceClassId?: number;

  /**  */
  workgroupId?: string;

  /**  */
  representWorkgroupId?: string;

  /**  */
  type?: string;

  /**  */
  supplementCategoryType?: string;

  /**  */
  validOnMon?: boolean;

  /**  */
  validOnTue?: boolean;

  /**  */
  validOnWed?: boolean;

  /**  */
  validOnThu?: boolean;

  /**  */
  validOnFri?: boolean;

  /**  */
  validOnSat?: boolean;

  /**  */
  validOnSun?: boolean;
}

export interface BookingPricingRoomSelectedNew {
  /**  */
  roomId?: number;

  /**  */
  selectedRoomRateId?: number;

  /**  */
  selectedPromotions?: PromotionResponse[];

  /**  */
  selectedSupplements?: SupplementResponse[];

  /**  */
  defaultSupplements?: SupplementResponse[];

  /**  */
  sessionId?: string;

  /**  */
  supplierId?: string;

  /**  */
  date?: string;
}

export interface BookingPricingRequest {
  /**  */
  startDate?: string;

  /**  */
  endDate?: string;

  /**  */
  acdId?: number;

  /**  */
  bookingPricingRoomSelected?: BookingPricingRoomSelectedNew[];

  /**  */
  workgroupId?: string;
}

export interface EventHeaderRequest {
  /**  */
  tId?: number;

  /**  */
  twId?: number;

  /**  */
  wiId?: string;

  /**  */
  bId?: string;

  /**  */
  rId?: string;

  /**  */
  uId?: number;

  /**  */
  messageId?: string;

  /**  */
  eventCode?: string;
}

export interface EventMessageRequest {
  /**  */
  header?: CombinedHeaderTypes;

  /**  */
  body?: string;

  /**  */
  signature?: string;
}

export interface PricingMethodUnit {
  /**  */
  id?: number;

  /**  */
  name?: string;

  /**  */
  type?: string;
}

export interface PricingMethod {
  /**  */
  buyMethod?: CombinedBuyMethodTypes;

  /**  */
  sellMethod?: CombinedSellMethodTypes;
}

export interface OtherServicesPriceResponse {
  /**  */
  id?: number;

  /**  */
  otherServiceId?: number;

  /**  */
  acdId?: number;

  /**  */
  viewerId?: string;

  /**  */
  supplierId?: string;

  /**  */
  name?: string;

  /**  */
  description?: string;

  /**  */
  startDateApply?: string;

  /**  */
  endDateApply?: string;

  /**  */
  openingTime?: string;

  /**  */
  closingTime?: string;

  /**  */
  listRoomClassIdApply?: string;

  /**  */
  listActiveDayInWeek?: string;

  /**  */
  listPricingMethodId?: string;

  /**  */
  pricingMethod?: CombinedPricingMethodTypes;

  /**  */
  buyPrice?: number;

  /**  */
  sellPrice?: number;

  /**  */
  currencyId?: number;

  /**  */
  durationId?: number;

  /**  */
  isApproved?: boolean;

  /**  */
  cloneById?: number;

  /**  */
  isModified?: boolean;

  /**  */
  buyOrSell?: number;

  /**  */
  workgroupId?: string;

  /**  */
  representWorkgroupId?: string;

  /**  */
  quantity?: number;

  /**  */
  validOnMon?: boolean;

  /**  */
  validOnTue?: boolean;

  /**  */
  validOnWed?: boolean;

  /**  */
  validOnThu?: boolean;

  /**  */
  validOnFri?: boolean;

  /**  */
  validOnSat?: boolean;

  /**  */
  validOnSun?: boolean;
}

export interface PriceToCalculatePromotion {
  /**  */
  isConsecutive?: boolean;

  /**  */
  isMinPrice?: boolean;

  /**  */
  isFirstNight?: boolean;

  /**  */
  isLastNight?: boolean;

  /**  */
  isMinPriceInGroup?: boolean;

  /**  */
  isFirstNightInGroup?: boolean;

  /**  */
  isLastNightInGroup?: boolean;

  /**  */
  averagePriceBuy?: number;

  /**  */
  averagePriceSell?: number;

  /**  */
  averagePriceBuyInGroup?: number;

  /**  */
  averagePriceSellInGroup?: number;

  /**  */
  numberOfDay?: number;

  /**  */
  numberOfDayInGroup?: number;

  /**  */
  minPriceInConfigBuy?: number;

  /**  */
  minPriceInConfigGroupBuy?: number;

  /**  */
  priceInConfigInLastNightBuy?: number;

  /**  */
  priceInConfigInFirstNightBuy?: number;

  /**  */
  priceInConfigInLastNightGroupBuy?: number;

  /**  */
  priceInConfigInFirstNightGroupBuy?: number;

  /**  */
  minPriceInConfigSell?: number;

  /**  */
  minPriceInConfigGroupSell?: number;

  /**  */
  priceInConfigInLastNightSell?: number;

  /**  */
  priceInConfigInFirstNightSell?: number;

  /**  */
  priceInConfigInLastNightGroupSell?: number;

  /**  */
  priceInConfigInFirstNightGroupSell?: number;

  /**  */
  roomIndex?: number;
}

export interface RoomConfigurationNew {
  /**  */
  orderDetailId?: string;

  /**  */
  date?: string;

  /**  */
  paxInRoomId?: number;

  /**  */
  selectedPromotions?: PromotionResponse[];

  /**  */
  selectedSupplements?: SupplementResponse[];

  /**  */
  selectedOtherServices?: OtherServicesPriceResponse[];

  /**  */
  defaultSupplements?: SupplementResponse[];

  /**  */
  isMinPrice?: boolean;

  /**  */
  isFirstNight?: boolean;

  /**  */
  isLastNight?: boolean;

  /**  */
  averagePrice?: number;

  /**  */
  numberOfDay?: number;

  /**  */
  isConsecutive?: boolean;

  /**  */
  isConfigActive?: boolean;

  /**  */
  isExternalServices?: boolean;

  /**  */
  buyPrice?: number;

  /**  */
  sellPrice?: number;

  /**  */
  selectedRoomrateId?: number;

  /**  */
  priceToCalculatePromotion?: CombinedPriceToCalculatePromotionTypes;
}

export interface OrderRoomSelectedNew {
  /**  */
  roomIdentifierId?: string;

  /**  */
  roomReferenceIds?: string[];

  /**  */
  acdId?: number;

  /**  */
  roomId?: number;

  /**  */
  adult?: number;

  /**  */
  child?: number;

  /**  */
  infant?: number;

  /**  */
  paxInRoomId?: number;

  /**  */
  bookingCustomerCreateRequests?: BookingCustomerCreateRequest[];

  /**  */
  sessionId?: string;

  /**  */
  workgroupId?: string;

  /**  */
  identityIndex?: number;

  /**  */
  priceClassId?: number;

  /**  */
  priceClassName?: string;

  /**  */
  markup?: CombinedMarkupTypes;

  /**  */
  roomConfigurations?: RoomConfigurationNew[];
}

export interface OrderDetailsCreateRequestNew {
  /**  */
  startDate?: string;

  /**  */
  endDate?: string;

  /**  */
  orderRoomSelected?: OrderRoomSelectedNew[];

  /**  */
  customerContactInfo?: CombinedCustomerContactInfoTypes;

  /**  */
  bookingCustomerCreateRequests?: BookingCustomerCreateRequest[];

  /**  */
  paymentMethod?: number;

  /**  */
  workgroupId?: string;

  /**  */
  createdBy?: number;

  /**  */
  markup?: CombinedMarkupTypes;

  /**  */
  orderId?: string;

  /**  */
  bookingId?: string;

  /**  */
  buyOrSell?: number;

  /**  */
  eventMessageLogId?: number;
}

export interface CreateOrderBuyByBookingServiceId {
  /**  */
  bookingServiceId?: string;

  /**  */
  eventMessageLogId?: number;

  /**  */
  bookingContactCreateRequest?: CombinedBookingContactCreateRequestTypes;
}

export interface BookingCustomerTotalRequest {
  /**  */
  id?: string;

  /**  */
  orderId?: string;

  /**  */
  roomIdentifierId?: string;

  /**  */
  workgroupId?: string;

  /**  */
  roomId?: number;

  /**  */
  policyId?: number;

  /**  */
  firstName?: string;

  /**  */
  lastName?: string;

  /**  */
  age?: number;

  /**  */
  birthday?: string;

  /**  */
  gender?: number;

  /**  */
  type?: string;

  /**  */
  index?: number;

  /**  */
  group?: Group[];

  /**  */
  guestIdentifier?: number;

  /**  */
  identificationNumber?: string;

  /**  */
  passportNumber?: string;

  /**  */
  passportExpiryDate?: string;

  /**  */
  passportIssueCountry?: string;

  /**  */
  createdBy?: number;
}

export interface UpdateBookingCustomerTotal {
  /**  */
  bookingCustomers?: BookingCustomerTotalRequest[];
}

export interface ServiceConfig {
  /**  */
  roomIdentifierId?: string;

  /**  */
  config?: CombinedConfigTypes;

  /**  */
  identityIndex?: number;

  /**  */
  roomReferenceIds?: string[];

  /**  */
  id?: number;

  /**  */
  acdId?: number;

  /**  */
  accommodationName?: string;

  /**  */
  code?: string;

  /**  */
  name?: string;

  /**  */
  guests?: Guest[];

  /**  */
  supplierId?: string;

  /**  */
  sessionId?: string;

  /**  */
  workgroupId?: string;

  /**  */
  representWorkgroupId?: string;

  /**  */
  isValid?: boolean;

  /**  */
  paxInRoomId?: number;

  /**  */
  roomConfig?: RoomConfig[];

  /**  */
  roomPriceTotal?: CombinedRoomPriceTotalTypes;

  /**  */
  dateChange?: number;

  /**  */
  isDeleted?: boolean;

  /**  */
  isUpdate?: boolean;

  /**  */
  isNew?: boolean;

  /**  */
  priceClassId?: number;

  /**  */
  priceClassName?: string;
}

export interface AvailableSupplierRequest {
  /**  */
  keyword?: string;

  /**  */
  cityCode?: string;

  /**  */
  cityName?: string;

  /**  */
  placeId?: string;

  /**  */
  startDate?: string;

  /**  */
  endDate?: string;

  /**  */
  nights?: number;

  /**  */
  adults?: number;

  /**  */
  childs?: number;

  /**  */
  starRating?: number[];

  /**  */
  langCode?: string;

  /**  */
  roomrateRange?: CombinedRoomrateRangeTypes;

  /**  */
  viewerId?: string;

  /**  */
  customGroupId?: string;

  /**  */
  isPublic?: boolean;

  /**  */
  buyOrSell?: number;

  /**  */
  priceClassIds?: string;

  /**  */
  roomQty?: number;

  /**  */
  maxAdult?: number;

  /**  */
  listRoomId?: string;

  /**  */
  acdId?: number;

  /**  */
  workgroupId?: string;

  /**  */
  categoryServiceIds?: string[];

  /**  */
  roomClassId?: number;

  /**  */
  serviceConfig?: ServiceConfig[];
}

export interface BookingDetailBySupplier {
  /**  */
  keyword?: string;

  /**  */
  cityCode?: string;

  /**  */
  cityName?: string;

  /**  */
  placeId?: string;

  /**  */
  startDate?: string;

  /**  */
  endDate?: string;

  /**  */
  nights?: number;

  /**  */
  adults?: number;

  /**  */
  childs?: number;

  /**  */
  starRating?: number[];

  /**  */
  langCode?: string;

  /**  */
  roomrateRange?: CombinedRoomrateRangeTypes;

  /**  */
  viewerId?: string;

  /**  */
  customGroupId?: string;

  /**  */
  isPublic?: boolean;

  /**  */
  buyOrSell?: number;

  /**  */
  roomQty?: number;

  /**  */
  maxAdult?: number;

  /**  */
  listRoomId?: string;

  /**  */
  acdId?: number;

  /**  */
  workgroupId?: string;

  /**  */
  roomClassId?: number;

  /**  */
  roomConfigs?: PricingRoomConfig[];

  /**  */
  supplierIds?: string[];

  /**  */
  serviceConfig?: ServiceConfig[];
}

export interface PaxInRoom {
  /**  */
  id?: number;

  /**  */
  roomId?: number;

  /**  */
  bedType?: number;

  /**  */
  extraBed?: number;

  /**  */
  maxPax?: number;

  /**  */
  maxAdult?: number;

  /**  */
  maxChild?: number;
}

export interface RoomCreateRequest {
  /**  */
  acdId?: number;

  /**  */
  name?: string;

  /**  */
  roomQty?: number;

  /**  */
  roomType?: number;

  /**  */
  description?: string;

  /**  */
  active?: boolean;

  /**  */
  listActiveDayInWeek?: string;

  /**  */
  paxInRooms: PaxInRoom[];

  /**  */
  hotelCode?: string;

  /**  */
  roomCode?: string;

  /**  */
  categoryServiceId?: string;

  /**  */
  validOnMon?: boolean;

  /**  */
  validOnTue?: boolean;

  /**  */
  validOnWed?: boolean;

  /**  */
  validOnThu?: boolean;

  /**  */
  validOnFri?: boolean;

  /**  */
  validOnSat?: boolean;

  /**  */
  validOnSun?: boolean;
}

export interface RoomUpdateRequest {
  /**  */
  acdId?: number;

  /**  */
  roomId?: number;

  /**  */
  workgroupId?: string;

  /**  */
  productId?: string;

  /**  */
  name?: string;

  /**  */
  roomQty?: number;

  /**  */
  roomType?: number;

  /**  */
  description?: string;

  /**  */
  listAmenitiesId?: string;

  /**  */
  listActiveDayInWeek?: string;

  /**  */
  paxInRooms?: PaxInRoom[];

  /**  */
  deletedPaxInRooms?: PaxInRoom[];

  /**  */
  lastEditedBy?: number;

  /**  */
  hotelCode?: string;

  /**  */
  roomCode?: string;

  /**  */
  categoryServiceId?: string;

  /**  */
  validOnMon?: boolean;

  /**  */
  validOnTue?: boolean;

  /**  */
  validOnWed?: boolean;

  /**  */
  validOnThu?: boolean;

  /**  */
  validOnFri?: boolean;

  /**  */
  validOnSat?: boolean;

  /**  */
  validOnSun?: boolean;
}

export interface RoomCloneRequest {
  /**  */
  acdId?: number;

  /**  */
  roomId?: number;

  /**  */
  cloneName?: string;

  /**  */
  createdBy?: number;

  /**  */
  hotelCode?: string;

  /**  */
  roomType?: number;

  /**  */
  roomCode?: string;

  /**  */
  productId?: string;

  /**  */
  categoryServiceId?: string;
}

export interface RoomRequest {
  /**  */
  roomId?: number;

  /**  */
  listRoomId?: string;

  /**  */
  acdId?: number;

  /**  */
  representWorkgroupId?: string;
}

export interface RoomratesRequest {
  /**  */
  id?: number;

  /**  */
  acdId?: number;

  /**  */
  viewerIdSellDefault?: string;

  /**  */
  representWorkgroupId?: string;

  /**  */
  roomId?: number;

  /**  */
  description?: string;

  /**  */
  fromUsingDate?: string;

  /**  */
  toUsingDate?: string;

  /**  */
  fromSellDate?: string;

  /**  */
  toSellDate?: string;

  /**  */
  buyBefore?: number;

  /**  */
  nightQtyMin?: number;

  /**  */
  nightQtyMax?: number;

  /**  */
  roomQtyMin?: number;

  /**  */
  roomQtyMax?: number;

  /**  */
  listActiveDayInWeek?: string;

  /**  */
  listPricingMethodId?: string;

  /**  */
  currencyId?: number;

  /**  */
  buyPrice?: number;

  /**  */
  sellPrice?: number;

  /**  */
  createdBy?: number;

  /**  */
  buyOrSell?: number;

  /**  */
  supplierId?: string;

  /**  */
  isPublic?: boolean;

  /**  */
  isModified?: boolean;

  /**  */
  customerGroupId?: string;

  /**  */
  priceClassId?: number;

  /**  */
  pricingMethods?: number[];

  /**  */
  validOnMon?: boolean;

  /**  */
  validOnTue?: boolean;

  /**  */
  validOnWed?: boolean;

  /**  */
  validOnThu?: boolean;

  /**  */
  validOnFri?: boolean;

  /**  */
  validOnSat?: boolean;

  /**  */
  validOnSun?: boolean;
}
export type CombinedRoomrateRangeTypes = RoomrateRange;
export type CombinedAgePolicyTypes = AgePolicy;
export type CombinedConfigTypes = PricingRoomConfig;
export type CombinedRoomPriceTotalTypes = PriceTotal;
export type CombinedPriceTotalTypes = PriceTotal;
export type CombinedMarkUpTypes = Markup;
export type CombinedRoomClassTypes = PrepareRoomClass;
export type CombinedHeaderTypes = EventHeaderRequest;
export type CombinedBuyMethodTypes = PricingMethodUnit;
export type CombinedSellMethodTypes = PricingMethodUnit;
export type CombinedPricingMethodTypes = PricingMethod;
export type CombinedPriceToCalculatePromotionTypes = PriceToCalculatePromotion;
export type CombinedMarkupTypes = Markup;
export type CombinedCustomerContactInfoTypes = BookingContactCreateRequest;
export type CombinedBookingContactCreateRequestTypes = BookingContactCreateRequest;
