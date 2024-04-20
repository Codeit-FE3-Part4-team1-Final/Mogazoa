type CompareModalType = 'subject' | 'object' | 'copy' | 'changed';

interface CompareModalInterface {
  product: string;
  productId: number;
  compareModalType: CompareModalType;
}
