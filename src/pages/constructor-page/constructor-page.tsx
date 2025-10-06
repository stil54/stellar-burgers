import { useAppSelector } from '../../services/store';
import { ConstructorPageUI } from '@ui-pages';
import { FC } from 'react';

export const ConstructorPage: FC = () => {
  const isIngredientsLoading = useAppSelector(
    (state) => state.ingredients.loading
  );

  return <ConstructorPageUI isIngredientsLoading={isIngredientsLoading} />;
};
